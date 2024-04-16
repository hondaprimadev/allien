import { Box, Text, useDisclosure } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import AudioAnalyzer from "./component/AudioAnalyzer";
import { useEffect, useState } from "react";
import LoginForm from "./component/LoginForm";

function App() {
  const [hertzCounter, setHertzCounter] = useState(0);
  const [start, setStart] = useState<boolean | undefined>();
  const [finish, setFinish] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [reset, setReset] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setStart(undefined);

    return () => {};
  }, [finish]);

  const onClickDownload = () => {
    setClicked(true);
  };

  const onClickReset = () => {
    setReset(!reset);
    setFinish(false);
  };

  return (
    <>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={2}>
        <GridItem w="100%">
          <LoginForm />
        </GridItem>
        <GridItem w="100%">
          <Box style={{ height: "100vh", marginTop: 30 }}>
            {/* <Text fontSize={28} textAlign={"center"}>
            Sound Analyzer
          </Text> */}
            <Card style={{ margin: 10 }}>
              <CardBody>
                <AudioAnalyzer
                  hertzCounter={setHertzCounter}
                  start={start}
                  setFinish={setFinish}
                  clicked={clicked}
                  setClicked={setClicked}
                  reset={reset}
                />
              </CardBody>
            </Card>
            <Box>
              <Card style={{ margin: 10 }}>
                <CardBody>
                  <Text fontSize={40}>{hertzCounter} Hz</Text>
                </CardBody>
              </Card>

              <Box width="100%" textAlign="center">
                {finish ? (
                  <>
                    <Button
                      style={{ margin: 10 }}
                      type="button"
                      colorScheme="teal"
                      title="Check"
                      onClick={onOpen}
                    >
                      <Text>Cek Hasil</Text>
                    </Button>
                    <Button
                      style={{ margin: 10 }}
                      type="button"
                      colorScheme="red"
                      title="Download"
                      onClick={onClickDownload}
                    >
                      <Text>Download Sample</Text>
                    </Button>
                    <Button
                      style={{ margin: 10 }}
                      type="button"
                      colorScheme="orange"
                      title="Reset"
                      onClick={onClickReset}
                    >
                      <Text>Reset</Text>
                    </Button>
                  </>
                ) : start ? (
                  <Button isLoading colorScheme="red" variant="solid">
                    Sedang Mengetes
                  </Button>
                ) : (
                  <Button
                    type="button"
                    colorScheme="red"
                    margin={10}
                    onClick={() => setStart(true)}
                  >
                    <Text>Mulai Tes</Text>
                  </Button>
                )}
              </Box>
            </Box>
            {/* <Text style={{ margin: 10, textAlign: "center" }}>
            HSO Semarang - Technical Division
          </Text> */}
          </Box>
        </GridItem>
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hasil Tes Suara Mesin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <TableCaption>Lakukan servis motor secara rutin.</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Komponen</Th>
                    <Th>Hasil</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mesin Kanan</Td>
                    <Td>GOOD</Td>
                  </Tr>
                  <Tr>
                    <Td>Mesin Kiri</Td>
                    <Td>GOOD</Td>
                  </Tr>
                  <Tr>
                    <Td>Mesin Tengah</Td>
                    <Td>GOOD</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
