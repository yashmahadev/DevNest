export default function Footer() {
    return (
      <footer className="text-center py-2 text-sm text-gray-500 bg-white shadow-sm">
        © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME} – All tools are free to use
      </footer>
    );
  }
