import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function Home() {
  const key = process.env.REACT_APP_API;
  const [link, setLink] = useState("")
  const [name, setName] = useState("")
  const [sName, setSName] = useState("")
  const [wallet, setWallet] = useState({
    private_key: '',
    wallet: '',
  })
  const [contracts, setContracts] = useState([
    {
      chain_id: '',
      contract: '',
      name: '',
      request_id: '',
      short_name: '',
      status: '',
      transaction_pixel: '',
      transaction_url: '',
    }
  ]
)
  const [wallets, setWallets] = useState([])

  const options = {
    method: 'POST',
    url: 'https://thentic.p.rapidapi.com/nfts/contract',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
    },
    data: `{"key":"${key}","chain_id":97,"name":"${name}","short_name":"${sName}"}`
  };

  const options3 = {
    method: 'GET',
    url: 'https://thentic.p.rapidapi.com/contracts',
    params: {key: key, chain_id: '97'},
    headers: {
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
    }
  };

  const options2 = {
    method: 'POST',
    url: 'https://thentic.p.rapidapi.com/wallets/new',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
    },
    data: `{"key":"${key}"}`
  };

  const options4 = {
    method: 'GET',
    url: 'https://thentic.p.rapidapi.com/wallets/all',
    params: {key: `${key}`},
    headers: {
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'thentic.p.rapidapi.com'
    }
  };
  
  const viewWallets = () => {
    axios.request(options4).then(function (response) {
        setWallets(response.data.wallets)
    }).catch(function (error) {
        console.error(error);
    });
  }
  
  
  const createWallet = () => {
    axios.request(options2).then(function (response) {
        setWallet(response.data)
    }).catch(function (error) {
        console.error(error);
    });
  }

  const walletItems = 
    wallets.map((wallet) => {
        return(
          <span className="relative rounded-md p-3 hover:bg-gray-100 text-blue-500 break-all text-sm">
              {wallet}
          </span>
        )
      })


  const contractItems =  
    contracts.map((contract) => {
      return(
        <button className="relative rounded-md p-3 hover:bg-gray-100 text-blue-500">
            <Link to='/collections'>{contract.name}</Link>
        </button>
      )
    })
  

  const showContracts = () => {
    axios.request(options3).then(function (response) {
      setContracts(response.data.contracts)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const createNft = () => {
    axios.request(options).then(function (response) {
      setLink(response.data.transaction_url)
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    showContracts();
  }, [])

  return (
    <div className="App">
      <header className="App-header">

        <h1 className="text-3xl font-bold underline">
          Thentic Demo
        </h1>
        <main>

        <p className='mt-10 mb-10'>
          NFT Asset Management
        </p>

        <div>
          <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} 
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
          <input type="text" value={sName} placeholder="short name" onChange={(e) => setSName(e.target.value)} 
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
          <button onClick={createNft} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Create new Nft
          </button>
        </div>
        
        <div className='mt-5'>
          <a href={`${link}`}>
            Contract Creation Link: {link}
          </a>
        </div>

        <div className="w-full max-w-lg px-2 py-8 sm:px-0">
        <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                className={({ selected }) =>
                    classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                }
                >
                Collections
                </Tab>
                <Tab
                className={({ selected }) =>
                    classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                }
                >
                Create Wallet
                </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
                <Tab.Panel
                className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
                >
                <div>
                    { contractItems }
                </div>
                
                </Tab.Panel>
                <Tab.Panel
                className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
                >
                <ul>
                    <li className="relative  text-blue-500">
                        <button onClick={createWallet} className="rounded-md p-3 hover:bg-gray-100">
                            Create Wallet
                        </button>
                        <div className="break-all text-red-500">
                            {wallet.private_key}
                        </div>
                        <div className="break-all text-green-500">
                            {wallet.wallet}
                        </div>
                    </li>
                    <li className="relative  text-blue-500">
                        <button onClick={viewWallets} className="rounded-md p-3 hover:bg-gray-100">
                            View Wallet
                        </button>
                        <div>
                            {walletItems}
                        </div>
                    </li>
                </ul>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>

    <div>
        <button onClick={showContracts} type="button" className="mb-10 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Reload Collection
        </button>
    </div>
        
        </main>
      </header>
    </div>
  );
}

export default Home;
