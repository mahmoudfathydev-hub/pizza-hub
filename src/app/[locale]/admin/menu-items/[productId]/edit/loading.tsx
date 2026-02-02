import Loader from "@/components/ui/Loader";

export default function AdminItemsLoading() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="w-12 h-12" />
        </div>
    );
}
