import { useEffect, useState } from "react";

// Extend the Navigator interface to include the connection property
interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnection;
}

// Define types for network states
interface NavigatorConnection extends EventTarget {
  downlink?: number; // Megabits per second (Mb/s)
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | "5g";
  rtt?: number; // Round-trip time in milliseconds
  saveData?: boolean; // Whether data saving is enabled
  type?: string; // Type of connection (e.g., 'wifi', 'cellular')
}

interface NetworkState {
  online: boolean; // Whether the browser is online or offline
  since?: Date; // Timestamp when the online status last changed
  downlink?: number; // Network downlink speed
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g" | "5g"; // Effective connection type
  rtt?: number; // Round-trip time
  saveData?: boolean; // If the user prefers reduced data usage
  type?: string; // Connection type (if available)
}

// Hook to track network status
export const useNetworkState = (): NetworkState => {
  const connection =
    typeof navigator === "undefined"
      ? (navigator as NavigatorWithConnection)?.connection
      : undefined;

  const [networkState, setNetworkState] = useState<NetworkState>({
    online: navigator.onLine,
    downlink: connection?.downlink,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type,
    since: undefined,
  });

  useEffect(() => {
    // Handler for online and offline events
    const updateOnlineStatus = () => {
      setNetworkState((prevState) => ({
        ...prevState,
        online: navigator.onLine,
        since: new Date(), // Update the time when the status changed
      }));
    };

    // Handler for connection change (effectiveType, downlink, etc.)
    const updateConnectionStatus = () => {
      if (connection) {
        setNetworkState((prevState) => ({
          ...prevState,
          downlink: connection.downlink,
          effectiveType: connection.effectiveType,
          rtt: connection.rtt,
          saveData: connection.saveData,
          type: connection.type,
        }));
      }
    };

    // Add event listeners for online/offline events
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // If supported, listen for changes in the connection info
    if (connection) {
      connection.addEventListener("change", updateConnectionStatus);
    }

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      if (connection) {
        connection.removeEventListener("change", updateConnectionStatus);
      }
    };
  }, []);

  return networkState;
};
