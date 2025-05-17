import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from 'react';
import useDocumentTitle from "@/hooks/useDocumentTitle";
import SEO from "../SEO";

export default function ToolLayout({ children, title, description, keywords }) {
    useDocumentTitle(title);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <SEO title={title} description={description} keywords={keywords} />
            <div className="flex h-screen overflow-hidden">
                <Sidebar collapsed={collapsed} />

                <div className="flex flex-col flex-1">
                    <Header toggleSidebar={() => setCollapsed(!collapsed)} />
                    <main className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
                    {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
