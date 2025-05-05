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
import axiosInstance from "../lib/axiosInstance";
import FormTable from "../components/form/FormTable";
import ButtonFilled from "../components/elements/ButtonFilled";
import { FaPlus } from "react-icons/fa";

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalTableItems = tables.length;
  const totalPages = Math.ceil(totalTableItems / itemsPerPage);

  const displayedTable = tables.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axiosInstance.get("/tables");
        setTables(response.data);
      } catch (error) {
        console.error("Gagal mengambil data meja:", error);
      }
    };
    fetchTables();
  }, []);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (table) => {
    setSelectedTable(table);
    setNewStatus(table.status);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleAddFormSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post("/tables", formData);
      setTables([...tables, response.data]);
      closeAddModal();
    } catch (error) {
      console.error("Gagal menambahkan meja:", error);
    }
  };

  const handleEditFormSubmit = async () => {
    if (!selectedTable) return;

    try {
      const response = await axiosInstance.put(`/tables/${selectedTable.id}`, {
        status: newStatus,
      });
      setTables(
        tables.map((table) =>
          table.id === selectedTable.id ? response.data : table
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Gagal mengubah status meja:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Meja</h2>

        <ButtonFilled
          onClick={openAddModal}
          className="flex items-center px-4 py-2 rounded flex-shrink-0 w-auto"
          color="grey"
          variant="outline"
          radius="lg"
          endContent={<FaPlus />}
        >
          Tambahkan Meja
        </ButtonFilled>
      </div>

      <Table
        aria-label="List Meja"
        bottomContent={
          tables.length > itemsPerPage && (
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
          <TableColumn>Nomor</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Belum Ada Meja">
          {displayedTable.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No Table available.
              </TableCell>
            </TableRow>
          ) : (
            displayedTable.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <ButtonFilled
                    color="green"
                    className="w-[30px]"
                    radius="lg"
                    onPress={() => openEditModal(item)}
                  >
                    Edit Status
                  </ButtonFilled>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Modal Tambah Meja */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <ModalContent>
          <ModalHeader>Tambahkan Meja Baru</ModalHeader>
          <ModalBody>
            <FormTable onSubmit={handleAddFormSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={closeAddModal}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Edit Status Meja */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalContent>
          <ModalHeader>Edit Status Meja</ModalHeader>
          <ModalBody>
            <label className="block text-sm font-medium text-gray-700">
              Pilih Status Baru
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full bg-gray-100 border rounded-md"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={closeEditModal}>
              Batal
            </Button>
            <Button variant="light" onPress={handleEditFormSubmit}>
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TablePage;
