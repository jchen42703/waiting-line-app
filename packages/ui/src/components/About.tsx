import {
    Box,
    VStack,
    Button,
    Flex,
    Divider,
    chakra,
    Grid,
    Text,
    GridItem,
    Container,
  } from '@chakra-ui/react';
  import {} from '@chakra-ui/react';
  
  interface FeatureProps {
    heading: string;
    text: string;
  }
  
  const Feature = ({ heading, text }: FeatureProps) => {
    return (
      <GridItem>
        <chakra.h3 fontSize="xl" fontWeight="600">
          {heading}
        </chakra.h3>
        <chakra.p>{text}</chakra.p>
      </GridItem>
    );
  };
  
  export default function About() {
    return (
      <Box bg={"#F7F5F2"} as={Container} maxW={"container.xl"}  pt={"10%"} >
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={4}>
          <GridItem colSpan={1}>
            <VStack pl="10%" alignItems="flex-start" spacing="20px">
              <chakra.h2 fontWeight="bold" fontSize="3xl" >
                Easy to use waiting line app.
              </chakra.h2>
              <Text fontWeight="semibold" fontSize={"lg"}>We bring together everything thats <Text color="blue">required to seamlessly create a waiting line </Text> for your business.</Text>
              <Button colorScheme="blue" rounded="lg" size="md">
                Get started with your queue.
              </Button>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex pt="10%">
              <chakra.p fontWeight="semibold" fontSize={"lg"}>
                We provide easy to use, flexible and secure dashboards to manage your customers.
              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          pl="5%"
          pb="10%"
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{ base: '8', sm: '12', md: '16' }}>
          <Feature
            heading={'First Feature'}
            text={'Short text describing one of you features/service'}
          />
          <Feature
            heading={'Second Feature'}
            text={'Short text describing one of you features/service'}
          />
          <Feature
            heading={'Third Feature'}
            text={'Short text describing one of you features/service'}
          />
          <Feature
            heading={'Fourth Feature'}
            text={'Short text describing one of you features/service'}
          />
        </Grid>
      </Box>
    );
  }