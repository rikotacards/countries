// CountryDetail.js
import { useParams } from 'react-router';

export const CountryDetail = ({ onClose }) => {
  const { id } = useParams(); // 'id' will be 'ca', 'mx', or 'us'
  
  const getCountryName = (countryId) => {
    // Simple lookup logic for display
    const data = {
        'ca': 'Canada',
        'mx': 'Mexico',
        'us': 'United States',
    };
    return data[countryId] || 'Unknown Country';
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Details for {getCountryName(id)}</h3>
        <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
          &times; {/* Close button */}
        </button>
      </div>
      
      <p>This detailed content is rendered for the route: <code>/countries/{id}</code>.</p>
      <p>If you refresh the page or share this URL, the dialog will persist!</p>
    </div>
  );
};

