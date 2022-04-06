import { ButtonGroup, Container, IconButton, Stack, Image, Text } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
// @ts-ignore
import coffee from "../media/home/coffee.gif"

export default function Footer(){ 
    return (
  <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
      <Image src={coffee}></Image>
    <Stack spacing={{ base: '4', md: '5' }}>
      <Stack justify="space-between" direction="row" align="center">
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Lyne, Inc. All rights reserved.
      </Text>
    </Stack>
  </Container>
)
}



