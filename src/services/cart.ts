export async function updateItemInCart(productId: string, count: number) {
  const res = await fetch("/api/cart/put", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, count }),
  });
  return res.json();
}

export async function removeItemFromCart(productId: string) {
  const res = await fetch("/api/cart/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function clearCart() {
  const res = await fetch("/api/cart/clear", { method: "DELETE" });
  return res.json();
}
