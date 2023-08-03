"use client"

import { Title } from "@/components/title"
import { AppDescription } from "@/components/app-description"
import { Instructions } from "@/components/instructions"
import { ComboBox } from "@/components/ui/combobox"
import { MetaboliteInfo } from "@/components/metabolite-info"
import { Footer } from "@/components/footer"

import { useState, useEffect } from 'react'

// This is the main component to render the page with the dropdown menu and metabolite info
export default function Home() {

  const [fetchError, setFetchError] = useState();
  const [metabolite, setMetabolite] = useState('');
  const [metabolites, setMetabolites] = useState([]);

  // The list of metabolites is fetched first here when this component mounts
  useEffect(() => {
    fetch(
      "http://localhost/api/metabolites",
      {
        headers: {
          Accept: "application/json",
        }
      }      
    )
    .then((response) => response.json())
    .then((data) => {
      setMetabolites(data.Metabolites);
      console.log('data.Metabolites: ' + data.Metabolites);        
    
    })
    .catch((error) => setFetchError(error));
  }, []);

  // I use the fetched list of metabolites to create a list of objects containing 'values' and 'items' as attributes that will be used to populate the combobox component 
  var comboBoxOptions = []
  let index = 0;
  if (metabolites.length != 0) {
    metabolites.forEach(populateComboBoxOptions);
    function populateComboBoxOptions(item, index) {
      comboBoxOptions.push({value : item.toLowerCase(), label : item});
    }
  }

  // following the idea of the React framework the main interface or page is splitted into components. The component definitions are located into the 'components' folder. I will render the <Title/>, <AppDescription/> and <Instructions/> components when the main component Home is mounted. Then the <ComboBox/> component is loaded only after the metabolite list is fetched, this is why the conditional (ternary) operator is used to only render <ComboBox/> when the metabolite list is filled with the data taken from the API. Something similar is done for the <MetaboliteInfo/> component that will contain the Reaction Type, Equation and Description of the metabolite; it will only be loaded when a metabolite is selected from the ComboBox and the data from the local and PubMed APISs is fetched. Please check the definition of the <MetaboliteInfo/> component in the 'metabolite-info.jsx' file in the 'components' folder.
  return (
    <>
      <div className="container flex flex-col min-h-screen max-w-[64rem] items-center gap-4 text-center pt-8">   
        <Title/>
        <AppDescription/>
        <Instructions/>
        {metabolites.length != 0 ? 
        <ComboBox options={comboBoxOptions} comboBoxLabel={"metabolite"} setSelection={setMetabolite}/> : 
        (!fetchError ? <div>loading metabolite list...</div> : <div>failed to load</div>)
}
        {metabolite && <MetaboliteInfo metabolite={metabolite}/>}
        <Footer/>
      </div>
    </>
  )
}
