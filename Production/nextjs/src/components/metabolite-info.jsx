import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { useState, useEffect } from 'react'

// This is the component that will fetch and show the information about the metabolite from the local and Pubmed APIs.
export function MetaboliteInfo({metabolite}) {

  const [fetchError, setFetchError] = useState();
  const [metaboliteReactionType, setMetaboliteReactionType] = useState('');
  const [metaboliteEquation, setMetaboliteEquation] = useState('');
  const [pubmedDescription, setPubmedDescription] = useState('');

  // as said, after a metabolite is selected this component is mounted passing the selected metabolite as props. Then the selection is used to fetch the local and pubmed APIs. I use the chain functionality of Javascript to fetch first the local API to the Equation, Reaction Type and PubmedID and then I used the fetched PubmedID to fetch the pubmed API only after the first fetch is completed. Note that I included conditions to handle the cases where is incomplete information in the APIs about the metabolite like for example in the case of the 'Triglyceride' no description is given in the pubmed API.
  useEffect(() => {

    const result = fetch(("http://localhost/api/metabolites/" + metabolite))
    .then(response => response.json()) // pass the data as promise to next then block
    .then(data => {
      (data.ReactionType !== undefined ? setMetaboliteReactionType(data.ReactionType) : setMetaboliteReactionType('No reaction type provided'));
      (data.Equation !== undefined ? setMetaboliteEquation(data.Equation) : setMetaboliteEquation('No equation provided'));
      const pubmedIdMetabolite = data.pubmedID;
      return fetch(("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/" + pubmedIdMetabolite + "/description/JSON")); // make a 2nd request and return a promise
    })
    .then(response => response.json())
    .catch((error) => setFetchError(error))

    // I'm using the result const to show that you can continue to extend the chain from the returned promise
    result.then(r => {
      (
        r.InformationList.Information[1] !== undefined ? 
        setPubmedDescription(r.InformationList.Information[1].Description) : 
        setPubmedDescription('No description provided')
      )
    });

  }, [metabolite]);

  // Only after the final fetch is made obtaining the description of the metabolite from the pubmed API the actual data is shown, while the fetching is being done only a message is shown informing the user that application is fetching information about the metabolite
  if (!pubmedDescription) {
    <div className="grid grid-cols-2 p-16 mx-16">Loading information about metabolite...</div>
  }

  // if there is an error in the fetching nothing is rendered in this component except an error message
  if (fetchError) return "An error has occurred.";

  // the section with the information of the metabolite is implemented with 'Card' components. Three cards will show the Equation, Reaction Type and Description of the metabolite
  return ( 
    <div className="grid grid-cols-2">
      <div>
      <Card className="m-4 font-semibold">
          <CardHeader className="text-start">
            <CardTitle>Reaction Type:</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="text-start text-red-600 text-xl font-bold">
            <p>{metaboliteReactionType}</p>
          </CardContent>
          <CardFooter></CardFooter>
      </Card>
      <Card className="m-4 font-semibold">
          <CardHeader className="text-start">
          <CardTitle>Equation:</CardTitle>
          <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="text-start text-teal-400 text-xl font-bold">
            <p>{metaboliteEquation}</p>
          </CardContent>
          <CardFooter></CardFooter>
      </Card>
      </div>
      <div>
      <Card className="m-4 font-semibold">
          <CardHeader className="text-start">
            <CardTitle>Description:</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="text-start">
            <p>{pubmedDescription}</p>
          </CardContent>
          <CardFooter></CardFooter>
      </Card>
      </div>
    </div>
  )

}











 