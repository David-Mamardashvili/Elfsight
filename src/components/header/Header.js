import styled from 'styled-components';
import { useData } from '../providers';
import { Logo } from './Logo';

export function Header() {
  const {
    API_BASE_URL,
    name,
    setName,
    status,
    setStatus,
    species,
    setSpecies,
    type,
    setType,
    gender,
    setGender,
    activePage,
    setActivePage,
    setApiURL,
    filters,
    setFilters,
    locationSearch
  } = useData();

  const resetFilters = () => {
    locationSearch.set('page', 1);
    setApiURL(API_BASE_URL + '/?' + locationSearch.toString());
    window.history.pushState({}, '', '?' + locationSearch.toString());
    setActivePage(1);
    setName('');
    setStatus('');
    setSpecies('');
    setType('');
    setGender('');
    setFilters({
      name: null,
      status: null,
      species: null,
      type: null,
      gender: null
    });
  };

  const handleFilterChange = (key, value) => {
    locationSearch.set('page', activePage);

    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    Object.entries(updatedFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue) {
        locationSearch.set(filterKey, filterValue);
      } else {
        locationSearch.delete(filterKey);
      }
    });

    switch (key) {
      case 'name':
        setName(value);
        break;
      case 'status':
        setStatus(value);
        break;
      case 'species':
        setSpecies(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'gender':
        setGender(value);
        break;
      default:
        break;
    }

    window.history.pushState({}, '', '?' + locationSearch.toString());
    setApiURL(API_BASE_URL + '/?' + locationSearch.toString());
  };

  return (
    <HeaderContainer>
      <Logo />
      <FilterContainer>
        <Input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <Select
          value={status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="" hidden>
            Статус
          </option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </Select>
        <Input
          type="text"
          placeholder="Вид"
          value={species}
          onChange={(e) => handleFilterChange('species', e.target.value)}
        />
        <Input
          type="text"
          placeholder="Тип"
          value={type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        />
        <Select
          value={gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
        >
          <option value="" hidden>
            Пол
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </Select>
        <ResetButton onClick={resetFilters}>Сбросить фильтры</ResetButton>
      </FilterContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  gap: 10px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  @media (max-width: 380px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid #00afc7;
  border-radius: 40px;
  width: 100%;
  max-width: 190px;
  background-color: transparent;
  color: #88cb6a;

  &::placeholder {
    color: #88cb6a;
  }
`;

const Select = styled.select`
  padding: 15px;
  border: 1px solid #00afc7;
  border-radius: 40px;
  width: 100%;
  max-width: 190px;
  background-color: transparent;
  color: #88cb6a;
`;

const ResetButton = styled.button`
  // padding: 8px 12px;
  background-color: #ccc;
  color: #00afc7;
  border: 1px solid #88cb6a;
  border-radius: 40px;
  cursor: pointer;
  width: 100%;
  max-width: 190px;
  &:hover {
    background-color: #fff;
  }
`;
