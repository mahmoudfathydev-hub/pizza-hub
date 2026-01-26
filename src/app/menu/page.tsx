import Menu from "@/src/components/menu"
import { getProductsByCategory } from "@/src/server/db/products"

async function MenuPage() {
    const categorites = await getProductsByCategory()
    return (
        <main>
            {categorites.map(category => (
                <section key={category.id}>
                    <div className="container">
                        <h1 className="text-primary font-bold text-4xl italic mb-6">
                            {category.name}
                        </h1>
                        <Menu items={category.products}/>
                    </div>
                </section>
            ))}
        </main>
    )
}

export default MenuPage