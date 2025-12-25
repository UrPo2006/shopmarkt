export async function addToWishlist(productId: string) {
  const res = await fetch("/api/wishlist/add", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });

  return res.json();
}

export async function removeFromWishlist(productId: string) {
  const res = await fetch(`/api/wishlist/delete?productId=${productId}`, {
    method: "DELETE",
  });

  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("❌ Route لم يرجع JSON — بيرجع HTML");
  }
}

export async function getWishlist() {
  const res = await fetch("/api/wishlist/get")
  return res.json();
}
