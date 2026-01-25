import MenuItem from "./MenuItem"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Menu = ({items}:{items:any}) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((item) => (
                <MenuItem key={item.id} item={item}/>
            ))}
        </ul>
    )
}

export default Menu