"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Trash2, Pencil } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";

interface AddressType {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export default function Address() {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<AddressType, "_id">>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAddresses = async () => {
    try {
      const res = await fetch("/api/address");
      const data = await res.json();
      if (data.status === "success") setAddresses(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const handleEdit = (address: AddressType) => {
    setFormData({
      name: address.name,
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
    setEditingId(address._id);
    setOpen(true);
      setTimeout(() => setOpen(true), 0);
  };
/*=============================Delete======================*/
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
   
  const res = await fetch(`/api/address/delete?id=${id}`, { method: "DELETE" });
  const data = await res.json();
  if (data.status === "success"){
     toast.success("Address deleted successfully!");
     getAddresses();
  }else{
     toast.error("Failed to delete address");
  }
}catch (err) {
      console.error(err);
        toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };
// ================= ADD =================
const handleAddAddress = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/address/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.status === "success") {
      toast.success("Added Address successfully!");
      setFormData({ name: "", details: "", phone: "", city: "" });
      setOpen(false);
      getAddresses();
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to add address");
  } finally {
    setLoading(false);
  }
};

// ================= UPDATE =================
const handleUpdateAddress = async () => {
  if (!editingId) return;
  setLoading(true);
  try {
    const res = await fetch("/api/address/manage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: editingId, ...formData }),
    });

    const data = await res.json();
    if (data.status === "success") {
      toast.success("Updated Address successfully!");
      setFormData({ name: "", details: "", phone: "", city: "" });
      setEditingId(null);
      setOpen(false);
      getAddresses();
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update address");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="space-y-4">
      <h3 className="font-serif">My Address</h3>

      <div className="space-y-3">
        {addresses.length === 0 ? (
          <p className="text-sm text-muted-foreground font-serif">No address added yet</p>
        ) : (
          addresses.map((address) => (
            <div key={address._id} className="rounded-lg border p-4 space-y-1">
              <p><span className="font-serif pr-3">Name:</span>{address.name}</p>
              <p><span className="font-serif pr-3">Details:</span>{address.details}</p>
              <p><span className="font-serif pr-3">City:</span>{address.city}</p>
              <p><span className="font-serif pr-3">Phone:</span>{address.phone}</p>

              <div className="flex gap-2 mt-3">
               <Button variant="outline" onClick={() => handleEdit(address)}>
  <Pencil className="w-4 h-4 mr-1" /> Edit
</Button>

                <Button variant="outline" className="text-red-500" onClick={() => handleDelete(address._id)}>
                  {deletingId === address._id ? <Loader className="animate-spin w-4 h-4"/> : <Trash2 className="w-4 h-4"/>} Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">+ Add Address</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader className="font-serif">
            <DialogTitle>{editingId ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>

          <form
  onSubmit={(e) => {
    e.preventDefault();
    if (editingId) {
      handleUpdateAddress();
    } else {
      handleAddAddress();
    }
  }}
  className="space-y-5"
>
            <div className="space-y-3">
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-3">
              <Label>Details</Label>
              <Input name="details" value={formData.details} onChange={handleChange} />
            </div>
            <div className="space-y-3">
              <Label>Phone</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="space-y-3">
              <Label>City</Label>
              <Input name="city" value={formData.city} onChange={handleChange} />
            </div>

            <Button type="submit" className="w-full rounded-3xl bg-gradient-to-b from-gray-300 to-black text-white" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Address" : "Save Address"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
