    import '../App.css';
    import axios from 'axios';
    import { useState } from 'react';
    import { Link } from 'react-router-dom';

    function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
    }

    function Collections() {
    const key = process.env.REACT_APP_API;

    const [nfts, setNfts] = useState([{
        chain_id: '',
        contract: '',
        data: '',
        id: '',
        name: '',
        request_id: '',
        short_name: '',
        status: '',
        transaction_pixel: '',
        transaction_url: '',
      }])
    const [contract, setContract] = useState("0xb9491b1f7c49c7928beb2fad2ef6c2f452f22fce")
    const [nftId, setNftId] = useState(0)
    const [nftData, setNftData] = useState("https://spooktaculars.mypinata.cloud/ipfs/QmUxkZWd7RUTksjNwpTx9TyrsYGyMgPLpwwpeB3xK7SevE/1895.json")
    const [receiver, setReceiver] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    const [link, setLink] = useState("");
    const [from, setFrom] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    const [to, setTo] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    const [transferId, setTransferId] = useState(0)
    const [transferLink, setTransferLink] = useState("");
    const [invoiceLink, setInvoiceLink] = useState("")
    const [amount, setAmount] = useState(0)
    const [invoices, setInvoices] = useState([{
        amount: 0,
        status: '',
        request_id: ''
    }])
    const [req_id, setReqID] = useState("")

    const options = {
        method: 'GET',
        url: 'https://thentic.p.rapidapi.com/nfts',
        params: {key: key, chain_id: '97'},
        headers: {
        'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
        }
    };
    
    const options2 = {
        method: 'POST',
        url: 'https://thentic.p.rapidapi.com/nfts/mint',
        headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
        },
        data: `{"key":"${key}","chain_id":97,"contract":"${contract}","nft_id":${nftId},"nft_data":"${nftData}","to":"${receiver}"}`
    };

    const options3 = {
        method: 'POST',
        url: 'https://thentic.p.rapidapi.com/nfts/transfer',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
          'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
        },
        data: `{"key":"${key}","chain_id":97,"contract":"${contract}","nft_id":${transferId},"from":"${from}","to":"${to}"}`
      };

      const options4 = {
        method: 'POST',
        url: 'https://thentic.p.rapidapi.com/invoices/new',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
          'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
        },
        data: `{"key":"${key}","chain_id":97,"amount":${amount},"to":"${to}"}`
      };
      
      const options5 = {
        method: 'GET',
        url: 'https://thentic.p.rapidapi.com/invoices/all',
        params: {key: `${key}`, chain_id: '97'},
        headers: {
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
          'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
        }
      };

      const options6 = {
        method: 'DELETE',
        url: 'https://thentic.p.rapidapi.com/invoices/cancel',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
          'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
        },
        data: `{"key":"${key}","chain_id":97,"request_id":"${req_id}"}`
      };
      
      const cancelInvoice = () => {
        axios.request(options6).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
      }
      
      
      const getInvoices = () => {
        axios.request(options5).then(function (response) {
            setInvoices(response.data.invoices)
        }).catch(function (error) {
            console.error(error);
        });
      }

      const invoiceItems =  
        invoices.map((invoice, index) => {
            return(
            <div className='text-sm mb-2 mt-2'>
                <span>
                    Index {index} : Amount: {invoice.amount}  
                </span>
                <div>
                <span>Status: {invoice.status}</span>
                </div>
                <div>
                <span>Request ID: {invoice.request_id}</span>
                </div>
            </div>
            
            )
        })
      
      const createInvoice = () => {
        axios.request(options4).then(function (response) {
            setInvoiceLink(response.data.transaction_url)
        }).catch(function (error) {
            console.error(error);
        });
      }

      const nftItems =  
        nfts.map((nft) => {
            return(
            <div>
                <button className="text-xs relative rounded-md hover:bg-gray-100 text-blue-500 break-all">
                    {nft.data}
                </button>
            </div>
            
            )
        })

    const transferNft = () => {
        axios.request(options3).then(function (response) {
            setTransferLink(response.data.transaction_url)
        }).catch(function (error) {
            console.error(error);
        });
    }
    
    const mintNft = () => {
        axios.request(options2).then(function (response) {
        setLink(response.data.transaction_url);
        }).catch(function (error) {
        console.error(error);
        });
    }
    
    const showNft = () => {
        axios.request(options).then(function (response) {
        setNfts(response.data.nfts)
        }).catch(function (error) {
        console.error(error);
        });
    }

    return (
        <div className="App">
        <header className="App-header">
            <h1 className="text-3xl font-bold underline mt-10">
            Thentic Demo
            </h1>
            <main>
            <p className='mt-10 mb-10'>
            NFT Collection Management
            </p>

            <div>
            <button onClick={showNft} type="button" className="mt-5 mb-10 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Show Nfts
            </button>
            </div>

            <div className=''>
                {nftItems}
            </div>

            <div>
            <input type="text" value={contract} placeholder="contract" onChange={(e) => setContract(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <input type="number" value={nftId} placeholder="id" onChange={(e) => setNftId(e.target.valueAsNumber)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <input type="text" value={nftData} placeholder="data" onChange={(e) => setNftData(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <input type="text" value={receiver} placeholder="receiver" onChange={(e) => setReceiver(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <button onClick={mintNft} type="button" className="mt-5 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Mint Nft
            </button>
            
            </div>
            <div>
                <a href={`${link}`}>
                    Mint Link: {link}
                </a>
            </div>

            <div>
            <input type="text" value={contract} placeholder="contract" onChange={(e) => setContract(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <input type="number" value={transferId} placeholder="transferId" onChange={(e) => setTransferId(e.target.valueAsNumber)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <input type="text" value={from} placeholder="from" onChange={(e) => setFrom(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <input type="text" value={to} placeholder="to" onChange={(e) => setTo(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <button onClick={transferNft} type="button" className="mt-5 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Transfer Nft
            </button>
            
            </div>

            <div>
                <a href={`${transferLink}`}>
                    Transfer Link: {transferLink}
                </a>
            </div>

            <div>
            <input type="text" value={to} placeholder="to" onChange={(e) => setTo(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            <input type="number" value={amount} placeholder="amount" onChange={(e) => setAmount(e.target.valueAsNumber)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            
            <button onClick={createInvoice} type="button" className="mt-5 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Create Invoice
            </button>
            
            </div>

            <div>
                <a href={`${invoiceLink}`}>
                    Invoice Link: {invoiceLink}
                </a>
            </div>

            <div>
            <button onClick={getInvoices} type="button" className="mt-5 mb-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Show Invoices
            </button>
            {invoiceItems}
            </div>

            <div>
            <input type="text" value={req_id} placeholder="req_id" onChange={(e) => setReqID(e.target.value)} 
            className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "></input>
            
            <button onClick={cancelInvoice} type="button" className="mt-5 mb-5 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Cancel Invoice
            </button>
            
            </div>

            <div>
                <button type="button" className="mt-5 mb-10 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    <Link to='/'>Back Home</Link>
                </button>
            </div>
            
            </main>
        </header>
        </div>
    );
    }

    export default Collections;
