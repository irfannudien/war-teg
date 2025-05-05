import React, { useState } from "react";

const FormTransaction = ({ onSubmit, customers, menus, tables }) => {
  const [customerId, setCustomerId] = useState("");
  const [itemInputs, setItemInputs] = useState([{ menuId: "", qty: 1 }]);
  const [isDineIn, setIsDineIn] = useState(true);
  const [tableNumber, setTableNumber] = useState("");

  const addMenuItem = () => {
    setItemInputs((prev) => [...prev, { menuId: "", qty: 1 }]);
  };

  const updateItemInput = (idx, field, value) => {
    setItemInputs((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const removeItemInput = (idx) => {
    setItemInputs((prev) => prev.filter((_, i) => i !== idx));
  };

  const cartItems = itemInputs
    .filter((item) => item.menuId && item.qty > 0)
    .map((item) => {
      const menu = menus.find((m) => m.id === parseInt(item.menuId));
      return menu ? { ...menu, qty: parseInt(item.qty) } : null;
    })
    .filter(Boolean);

  const getTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId || cartItems.length === 0) return;

    // Buat array ID sebanyak qty
    const flattenedItems = cartItems.flatMap((item) =>
      Array(item.qty).fill(item.id)
    );

    onSubmit({
      customerId: parseInt(customerId),
      items: flattenedItems,
      isDineIn,
      tableNumber:
        isDineIn && tableNumber !== "" ? parseInt(tableNumber) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Customer</label>
          <select
            className="border px-2 py-1 w-full rounded"
            value={customerId}
            required
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Pilih Customer</option>
            {customers.map((cust) => (
              <option value={cust.id} key={cust.id}>
                {cust.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Pilih Menu & Jumlah</label>
          <div className="space-y-2">
            {itemInputs.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <select
                  className="border px-2 py-1 rounded w-[55%]"
                  value={item.menuId}
                  required
                  onChange={(e) =>
                    updateItemInput(idx, "menuId", e.target.value)
                  }
                >
                  <option value="">-- Pilih Menu --</option>
                  {menus.map((menu) => (
                    <option
                      key={menu.id}
                      value={menu.id}
                      disabled={itemInputs.some(
                        (it, i) => it.menuId === String(menu.id) && i !== idx
                      )}
                    >
                      {menu.name} (Rp{menu.price})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  max={99}
                  className="border px-1 rounded w-20"
                  value={item.qty}
                  required
                  onChange={(e) => updateItemInput(idx, "qty", e.target.value)}
                />
                <button
                  type="button"
                  className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-100"
                  onClick={() => removeItemInput(idx)}
                  tabIndex={-1}
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMenuItem}
              className="border px-3 py-1 rounded bg-blue-100 hover:bg-blue-300 text-blue-800 font-semibold"
            >
              + Tambah Menu
            </button>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Jenis Pesanan</label>
          <select
            className="border px-2 py-1 w-full rounded"
            value={isDineIn ? "dinein" : "takeaway"}
            onChange={(e) => setIsDineIn(e.target.value === "dinein")}
          >
            <option value="dinein">Makan di Tempat</option>
            <option value="takeaway">Dibawa Pulang</option>
          </select>
        </div>

        {isDineIn && (
          <div>
            <label className="block font-medium mb-1">Nomor Meja</label>
            <select
              className="border px-2 py-1 w-full rounded"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              required={isDineIn}
            >
              <option value="">Pilih Nomor Meja</option>
              {tables.map((table) => (
                <option key={table.id} value={table.number}>
                  {table.number}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="w-full bg-gray-50 border rounded-lg p-4 shadow-sm">
          <div className="font-semibold mb-2">Ringkasan Pesanan</div>
          <ul className="text-sm space-y-1">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.qty} = <b>Rp{item.qty * item.price}</b>
              </li>
            ))}
          </ul>
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Rp{getTotalAmount()}</span>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className={
            "px-4 py-2 rounded text-white " +
            (cartItems.length > 0 && customerId
              ? "bg-blue-700 hover:bg-blue-900"
              : "bg-gray-300 cursor-not-allowed")
          }
          disabled={cartItems.length === 0 || !customerId}
        >
          Simpan Transaksi
        </button>
      </div>
    </form>
  );
};

export default FormTransaction;
