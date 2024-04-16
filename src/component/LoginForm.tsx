import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Image,
  Center,
  Text,
} from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <Box maxW="md" mx="auto" marginEnd={10} marginStart={10}>
      <Text textAlign={"center"} marginTop={10}>
        QCC Teknin Allien
      </Text>
      <Text fontSize={26} textAlign={"center"}>
        Pendeteksi Suara Mesin
      </Text>
      <Center marginTop={-5}>
        <Image
          src="https://ik.imagekit.io/mf1j3kikz/images-removebg-preview.png?updatedAt=1713299302064"
          alt="Logo"
          boxSize={"160px"}
        />
      </Center>
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>Nama Konsumen</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>No Polisi</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Tipe Motor</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Kilometer</FormLabel>
          <Input type="text" />
        </FormControl>
        <Button marginTop={3} type="submit" colorScheme="red">
          Simpan Data
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
