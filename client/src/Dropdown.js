export default function Dropdown({data}){
    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <select >
                {data.map((item, idx) => <option key={idx} value={item.value}>{item.name}</option>)}
            </select>
        </div>
    )
}