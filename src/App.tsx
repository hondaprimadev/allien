import { Box, Text } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import AudioAnalyzer from "./component/AudioAnalyzer";
import { useEffect, useState } from "react";
import LoginForm from "./component/LoginForm";

function App() {
  const [hertzCounter, setHertzCounter] = useState(0);
  const [start, setStart] = useState<boolean | undefined>();
  const [finish, setFinish] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setStart(undefined);

    return () => {};
  }, [finish]);

  const onClickCheck = () => {
    setFinish(false);
    setClicked(true);
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={2}>
      <GridItem w="100%">
        <LoginForm />
      </GridItem>
      <GridItem w="100%">
        <Box style={{ height: "100vh" }}>
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
                <Button
                  style={{ margin: 10 }}
                  type="button"
                  colorScheme="teal"
                  title="Check"
                  onClick={onClickCheck}
                >
                  <Text>Cek Hasil</Text>
                </Button>
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
  );
}

export default App;
