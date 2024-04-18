import React from "react";


import { HeroLand } from "../../components/landingPage/LandingPage";
import { Header } from "../../components/header/Header";
import { Features } from "../../components/features/features";
import { AboutSectionOne } from "../../components/about/About";
import { Footer } from "../../components/footer/footer";
export const LandingPage =() => {

    return (
        <>
            <Header/>
        
            <HeroLand/>
            <Features/>
            <AboutSectionOne/>
            <Footer/>

        
        
        </>
    )
}