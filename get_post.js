const axios = require('axios');
//      getting query string
async function get_person(){
    const config = {
        method: 'get',
        url: `https://hyposmartag.pipedrive.com/v1/persons/954?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1`,
        headers: { "Content-Type": `application/json` }
    }

    let res = await axios(config)

    console.log(res.data.data.id)

    let personId=res.data.data.id

    return personId

}

async function create_person(name,email,phone,phone_mobile,phone_work,anrede,state,postal_code){
    let body={
        "name": name,
        "email": email,
        "phone": [
        {
            "label":"mobile",
            "value": phone_mobile
        },
        {
            "label":"work",
            "value": phone_work
        },        
        {
            "label":"phone",
            "value": phone
        }
        ],
        "229a827a9abe4ec939bf277ca37cb973bdad6314":anrede,
        "5c217a1775fd29774719caf1b91d0bfc1cbb12cf":state,
        "4218f297cc45c4486620d2bb983131ad322eb19e":postal_code
      }
  
      const res= await axios({
        method: 'POST',
        baseURL: 'https://hyposmartag.pipedrive.com/v1/persons?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1',
    
        headers: {
            "Content-Type": "application/json",
        },
        data:body,
      });
      console.log("Person created with id: "+res.data.data.id)

      let personId=res.data.data.id

      console.log("Person is created")
  
      return personId
  
    }

async function create_lead(lead_tittle,personId){
    let body={
        "title": lead_tittle,
        "person_id": personId
      }

    axios.post('https://hyposmartag.pipedrive.com/v1/leads?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1', body)
      .then(function (response) {
        console.log("Lead is successfully created with id : ",personId);
      })
      .catch(function (error) {
        console.log("error in inserting lead ");
      });    
}

async function create_deal(deal_tittle,personId,additional_data,productName){   
    if(productName=="hauskauf"||"Baufi Kau"){
      var tag='HK'
    }
    else if (productName=="hausbau"||"Baufi Bau"){
      var tag='HB'
    }
    else if(productName=="umschuldung"||"Baufi Um"){
      var tag='UM'
    }
    else{
      var tag='HK'
    }

    let body={
        "title":deal_tittle,
        "person_id": personId,
        "value":additional_data['Finanzierungsbetrag'],
        "stage_id":8, //ID 8
        "b5bdd440718ad2b741963b7adbcc68d48d3975d8":additional_data['Finanzierungsberatung angefragt?'],
        "d34eb5d97ee69f2956f71ba298ad5c5954878996":additional_data['Geplanter Haustyp'],
        "7c9d3ac4ab82abe99acaa0dcb20d4c71ca75116b":additional_data['Immobilienart'],
        "7c9d3ac4ab82abe99acaa0dcb20d4c71ca75116b":additional_data['Wann wollen Sie finanzieren?'],
        "d34eb5d97ee69f2956f71ba298ad5c5954878996":additional_data['Grundstück vorhanden?'],
        "15c5f11540d541d26deab5dbfe4ba9628a94c70a":productName,
      }
      
      const res= await axios({
        method: 'POST',
        baseURL: 'https://hyposmartag.pipedrive.com/v1/deals?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1',
    
        headers: {
            "Content-Type": "application/json",
        },
        data:body,
      });
      console.log("deal created with id: "+res.data.data.id)

      let dealId=res.data.data.id

      console.log("Deal is created")
  
      return dealId
  
}

async function create_note_inside_deal(content,dealId){
    let body={
        "content": content,
        "deal_id": dealId
      }

    axios.post('https://hyposmartag.pipedrive.com/v1/notes?api_token=0458ba0616316c43344af8e48d13b02d0c1d9fa1', body)
      .then(function (response) {
        console.log("Lead is successfully created with id : ",dealId);
      })
      .catch(function (error) {
        console.log(error);
      });    
}



// create_note_inside_deal("new note",850)
module.exports={create_deal,create_lead,create_person,create_note_inside_deal}