import { createContext, useContext, useState, ReactNode } from "react";

type CustomerContextType = {
    customer_id: string | null;
    origin: string | null;
    destination: string | null;
    setCustomerId: (id: string) => void;
    setOrigin: (origin: string) => void;
    setDestination: (destination: string) => void;
  };

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const [customer_id, setCustomerId] = useState<string | null>(null)
    const [origin, setOrigin] = useState<string | null>(null)
    const [destination, setDestination] = useState<string | null>(null)

    return (
        <CustomerContext.Provider value={{ customer_id, origin, destination, setCustomerId, setOrigin, setDestination }}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomer = () => {
    const context = useContext(CustomerContext)
    if (!context) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
}
