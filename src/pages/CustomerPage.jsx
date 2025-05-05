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
import FormCustomers from "../components/form/FormCustomers";
import { FaPlus } from "react-icons/fa";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState("blur");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalCustomerItems = customers.length;
  const totalPages = Math.ceil(totalCustomerItems / itemsPerPage);
  const displayedCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/customers");
        setCustomers(res.data);
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
    };
    fetchCustomers();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setBackdrop(backdrop);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = async (formData) => {
    try {
      const res = await axios.post("/customers", formData);
      setCustomers((prevCustomers) => [...prevCustomers, res.data]);
      closeModal();
    } catch (error) {
      console.error("Failed to create customer", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Customer</h2>
        <ButtonFilled
          onClick={openModal}
          className="flex items-center px-4 py-2 rounded flex-shrink-0 w-auto"
          color="grey"
          variant="outline"
          radius="lg"
          endContent={<FaPlus />}
        >
          Tambah Customer
        </ButtonFilled>
      </div>

      <Table
        aria-label="Customer Table"
        bottomContent={
          customers.length > itemsPerPage && (
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
          <TableColumn>Nama</TableColumn>
          <TableColumn>Nomor Telepon</TableColumn>
          <TableColumn>Alamat</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Belum Ada Customer">
          {displayedCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No customer available.
              </TableCell>
            </TableRow>
          ) : (
            displayedCustomers.map((cust) => (
              <TableRow key={cust.id}>
                <TableCell>{cust.name}</TableCell>
                <TableCell>{cust.phone}</TableCell>
                <TableCell>{cust.address}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex flex-wrap gap-3">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          contentlabel="Tambah Customer"
          className="modal-content"
          overlayclass="modal-overlay"
          backdrop={backdrop}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Tambahkan Customer Baru
            </ModalHeader>
            <ModalBody>
              <FormCustomers onSubmit={handleFormSubmit} />
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
    </div>
  );
};

export default CustomerPage;
