import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import axios from "../lib/axiosInstance";
import ButtonFilled from "../components/elements/ButtonFilled";
import FormTransaction from "../components/form/FormTransaction";
import { FaPlus } from "react-icons/fa";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [menus, setMenus] = useState([]);
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("blur");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("/transactions");
        setTransactions(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, menusRes, tablesRes] = await Promise.all([
          axios.get("/customers"),
          axios.get("/menus"),
          axios.get("/tables"),
        ]);
        setCustomers(customersRes.data || []);
        setMenus(menusRes.data || []);
        setTables(tablesRes.data || []);
      } catch (error) {
        console.error("Failed to fetch supporting data", error);
      }
    };
    fetchData();
  }, []);

  const totalItems = transactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const openModal = () => {
    setIsModalOpen(true);
    setBackdrop("blur");
  };
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (formData) => {
    try {
      const dataToSend = {
        customerId: formData.customerId,
        items: formData.items, // langsung array of ID
        isDineIn: formData.isDineIn,
        ...(formData.tableNumber && { tableNumber: formData.tableNumber }),
      };

      const res = await axios.post("/transaction", dataToSend);
      setTransactions((prev) => [...prev, res.data]);
      closeModal();
    } catch (error) {
      console.error("Failed to create transaction", error);
      if (error.response) {
        alert(
          "Gagal membuat transaksi: " +
            (error.response.data.message || JSON.stringify(error.response.data))
        );
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Transaksi</h2>
        <ButtonFilled
          onClick={openModal}
          className="flex items-center px-4 py-2 rounded flex-shrink-0 w-auto"
          color="grey"
          variant="outline"
          radius="lg"
          endContent={<FaPlus />}
        >
          Tambah Transaksi
        </ButtonFilled>
      </div>
      <Table
        aria-label="Transaction Table"
        bottomContent={
          transactions.length > itemsPerPage && (
            <div className="flex justify-center mt-6">
              <Pagination
                isCompact
                showControls
                showShadow
                color="default"
                current={currentPage}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn>Customer</TableColumn>
          <TableColumn>Menu</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Jenis</TableColumn>
          <TableColumn>Meja</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Belum Ada Transaksi">
          {displayedTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada transaksi.
              </TableCell>
            </TableRow>
          ) : (
            displayedTransactions.map((trx, idx) => (
              <TableRow key={trx.id || idx}>
                <TableCell>
                  {trx.customer?.name || trx.customer || "-"}
                </TableCell>
                <TableCell>
                  {Array.isArray(trx.items) && trx.items.length > 0
                    ? Object.entries(
                        trx.items.reduce((acc, item) => {
                          const name = item.name || "Menu Tidak Dikenal";
                          acc[name] = (acc[name] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([name, qty], idx, arr) => (
                        <span key={idx}>
                          {name} x {qty}
                          {idx < arr.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "-"}
                </TableCell>

                <TableCell>
                  {trx.totalAmount ? `Rp${trx.totalAmount}` : "-"}
                </TableCell>
                <TableCell>{trx.isDineIn ? "Dine In" : "Take Away"}</TableCell>
                <TableCell>{trx.isDineIn ? trx.tableNumber : "-"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        contentlabel="Tambah Transaksi"
        className="modal-content"
        overlayclass="modal-overlay"
        backdrop={backdrop}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Tambahkan Transaksi Baru
          </ModalHeader>
          <ModalBody>
            <FormTransaction
              onSubmit={handleFormSubmit}
              customers={customers}
              menus={menus}
              tables={tables}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={closeModal}
              className="close-button"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TransactionPage;
