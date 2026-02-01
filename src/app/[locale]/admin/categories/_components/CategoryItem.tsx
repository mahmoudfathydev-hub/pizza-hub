import { Category } from "@prisma/client";
import EditCategory from "./EditCategory";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import DeleteCategory from "./DeleteCategory";

async function CategoryItem({ category }: { category: Category }) {
    const locale = await getCurrentLocale();
    const t = await getTrans(locale, "categories");

    // Helper function to get translated category name
    const getCategoryDisplayName = (categoryKey: string) => {
        return t.categoryName[categoryKey] || categoryKey;
    };

    return (
        <li className="bg-gray-300 p-4 rounded-md flex justify-between gap-4 my-4">
            <h3 className="text-black font-medium text-lg flex-1">
                {getCategoryDisplayName(category.name)}
            </h3>
            <div className="flex items-center gap-2">
                <EditCategory translations={t} category={category} />
                <DeleteCategory id={category.id} />
            </div>
        </li>
    );
}

export default CategoryItem;
