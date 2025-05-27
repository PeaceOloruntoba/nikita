import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import useUserStore from "../store/useUserStore";

export default function QRScanner() {
  const navigate = useNavigate();
  const { getRestaurant, isLoading } = useUserStore();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const video = document.getElementById("qr-video");
    if (!video) return;

    // Dynamically import qr-scanner to avoid server-side issues
    import("qr-scanner").then(({ default: QrScanner }) => {
      const qrScanner = new QrScanner(
        video,
        async (result) => {
          if (scanned || isLoading) return;
          setScanned(true);
          const params = new URLSearchParams(result.data);
          console.log(params)
          const restaurantId = params.get("restaurantId");
          const tableId = params.get("tableId");
          const aiAgentId = params.get("aiAgentId");
          console.log(restaurantId)

          if (restaurantId) {
            try {
              const userData = await getRestaurant(restaurantId);
              console.log(userData)
              if (userData) {
                navigate("/ai", {
                  state: {
                    restaurant_id: restaurantId,
                    table_id: tableId,
                    ai_agent_id: aiAgentId,
                    userData,
                  },
                });
              } else {
                setScanned(false);
              }
            } catch (error) {
              toast.error("Failed to retrieve restaurant information");
              setScanned(false);
            }
          } else {
            toast.error("Invalid QR code");
            setScanned(false);
          }
        },
        { highlightScanRegion: true }
      );
      qrScanner.start();
      return () => qrScanner.destroy();
    });

    return () => {};
  }, [scanned, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 relative">
      <video id="qr-video" className="w-full max-w-md rounded-lg"></video>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <svg
            className="animate-spin h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-white mt-2">Fetching Restaurant Info...</p>
        </div>
      )}
      {!isLoading && (
        <div className="absolute bottom-4 bg-black/70 p-4 rounded-lg">
          <p className="text-white text-lg">
            {scanned ? "Tap to Scan Again" : "Point the camera at the QR code"}
          </p>
          {scanned && (
            <button
              onClick={() => setScanned(false)}
              className="mt-2 bg-primary text-white py-2 px-4 rounded-xl hover:bg-primary-dark"
            >
              Scan Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
