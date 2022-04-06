import {Fragment} from "react";
import Navbar from "../../components/home/Navbar"
import Hero from "../../components/home/Hero"
import About from "../../components/home/About"
import Team from "../../components/home/Team"
export default function Home(){

  return(
    <Fragment>
      <Navbar></Navbar>
      <Hero></Hero>
      <About></About>
      <Team></Team>
    </Fragment>
  )
}


