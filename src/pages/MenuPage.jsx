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
import FormMenu from "../components/form/FormMenu";
import ButtonFilled from "../components/elements/ButtonFilled";
import { FaPlus } from "react-icons/fa";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("blur");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [menuIdToDelete, setMenuIdToDelete] = useState(null); // Store menuId for deletion

  const totalMenuItems = menu.length;
  const totalPages = Math.ceil(totalMenuItems / itemsPerPage);

  const displayedMenu = menu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("/menus");
        setMenu(res.data);
      } catch (error) {
        console.error("Failed to fetch menu", error);
      }
    };

    fetchMenu();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setBackdrop(backdrop);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (formData) => {
    try {
      const res = await axios.post("/menus", formData);
      setMenu((prevMenu) => [...prevMenu, res.data]);
      closeModal();
    } catch (error) {
      console.error("Failed to create menu", error);
    }
  };

  const openDeleteModal = (menuId) => {
    setMenuIdToDelete(menuId); // Store the menuId for deletion
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMenuIdToDelete(null); // Reset the menuId after closing the modal
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/menus/${menuIdToDelete}`); // Use the stored menuId to delete
      setMenu((prev) => prev.filter((item) => item.id !== menuIdToDelete));
    } catch (error) {
      console.error("Gagal menghapus menu", error);
      alert("Terjadi kesalahan saat menghapus menu.");
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Menu</h2>
        <ButtonFilled
          onClick={openModal}
          className="flex items-center px-4 py-2 rounded flex-shrink-0 w-auto"
          color="grey"
          variant="outline"
          radius="lg"
          endContent={<FaPlus />}
        >
          Tambah Menu
        </ButtonFilled>
      </div>

      <Table
        aria-label="Menu Table"
        bottomContent={
          menu.length > itemsPerPage && (
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
          <TableColumn>Menu</TableColumn>
          <TableColumn>Stock</TableColumn>
          <TableColumn>Harga</TableColumn>
          <TableColumn>Update</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Belum Ada Menu">
          {displayedMenu.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No menu available.
              </TableCell>
            </TableRow>
          ) : (
            displayedMenu.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  {Number(item.price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell>
                  <ButtonFilled
                    color="red"
                    className="w-[30px]"
                    onPress={() => openDeleteModal(item.id)} // Open delete modal with the item's ID
                    radius="lg"
                  >
                    Delete
                  </ButtonFilled>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex flex-wrap gap-3">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          contentlabel="Create Menu"
          className="modal-content"
          overlayclass="modal-overlay"
          backdrop={backdrop}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Tambahkan Menu Baru
            </ModalHeader>
            <ModalBody>
              <FormMenu onSubmit={handleFormSubmit} />
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

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus Menu</ModalHeader>
          <ModalBody>Apakah kamu yakin ingin menghapus menu ini?</ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleDeleteConfirmed}>
              Ya, Hapus
            </Button>
            <Button variant="light" onPress={closeDeleteModal}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MenuPage;
