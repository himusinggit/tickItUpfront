import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Scanner } from '@yudiel/react-qr-scanner';
const ScannerPage = () => {
  const [code, setCode] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [submittedData, setSubmittedData] = useState(null);
  const [ticketCode, setTicketCode] = useState(null);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["scan", code],
    queryFn: async () => {
      try{
      const resp = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/tickets/scan/${code}`,
        { withCredentials: true }
      );
      return resp.data;
    }
    catch(e){
      console.log(e.response?.data);
    }
    },
    enabled: false,
    retry: false,
  });

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    const result = await refetch();
    
    if (result.data) {
      setSubmittedData(result.data);
      setIsVisible(false);
      alert("Ticket scanned successfully");
      console.log(result.data);
    }
    // Error is automatically available in `error` state
  };
  const {mutate}=useMutation({
    mutationFn: async () => {
      const resp = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/tickets/scan`,
        {
        },
        { withCredentials: true,
          params:{
            scannerCode:code,
            ticketCode:ticketCode
          }
         }
      );
      return resp.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.response?.data);
    }
  })
  useEffect(() => {
    if (submittedData) {
      mutate();
    }
  },[ticketCode]);
  // Show result after scanner code got verified
  if (!isVisible && submittedData) {
    return (
      <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <div className='flex-col items-center justify-center bg-gray-100 relative'style={{height:"500px",width:"100%",minWidth:"300px",maxWidth:"600px",padding:"10px"}}>
        {/* <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">✓ Scanner Code Verified</h2>
        </div> */}
            <Scanner
              onScan={(result) =>{setTicketCode(result[0]?.rawValue); console.log(result);}}
              onError={(error) => console.log(error?.message)}
              constraints={{
                facingMode:"environment",
              }}
                videoStyle={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // or "contain"
                }}
            />
        </div>
        <div>{code}</div>
        <div style={{
          padding:"20px",
          background:"red",
          borderRadius:"20px"
        }}>refetch Scanner Code</div>
      </div>
    );
  }

  return (
    <div className='h-screen'>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 flex flex-col gap-4">
          <label htmlFor="scan" className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Enter Scanner Code
          </label>
          
          <input
            id="scan"
            autoFocus
            className="w-full p-3 bg-gray-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-xl outline-none transition-all"
            placeholder="SCN1234"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isFetching}
          />

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
              Error: {error.response?.data?.message || error.message || 'Scan failed'}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isFetching || !code.trim()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {isFetching ? (
              <>
                <span className="animate-spin">⟳</span> Scanning...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;