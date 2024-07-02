import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { Button, Rate, Select, Card, Row, Col, Tag, Checkbox, Spin } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LOCATION_OPTIONS = [
  {value: "None", label: "Pick a location"},
  { value: "Rangpur", label: "Rangpur" },
  { value: "Dhaka", label: "Dhaka" },
  { value: "Rajshahi", label: "Rajshahi" },
  { value: "Mymensingh", label: "Mymensingh" },
  { value: "Khulna", label: "Khulna" },
  { value: "Chittagong", label: "Chittagong" },
  { value: "Barisal", label: "Barisal" },
  { value: "Sylhet", label: "Sylhet" }
];

const AGENCY_DATA = [
  { name: "SHYAMOLI NR TRAVELS", rating: 4.5, seats: 20 },
  { name: "ANITA ENTERPRISE", rating: 4.2, seats: 15 },
  { name: "HANIF ENTERPRISE", rating: 4.0, seats: 17 },
  { name: "RABBANI PARIBAHAN", rating: 3.8, seats: 18 },
  { name: "AHAD ENTERPRISE", rating: 3.5, seats: 20 }
];

const generateRandomTickets = (destination, departure, date, returnDate) => {
  return AGENCY_DATA.map(agency => {
    // 1 ile 10 arasında rastgele bir mesafe belirle
    const randomDistance = Math.floor(Math.random() * 10) + 1;

    // Varış zamanını hesapla (1 ile 10 saat arasında rastgele)
    const arrivalTime = new Date(date.getTime() + (Math.floor(Math.random() * 10) + 1) * 3600000);

    // Fiyatı hesapla (mesafe * acente puanı * koltuk sayısı)
    const price = Math.round(randomDistance * agency.rating * agency.seats);

    // Uçuş süresini hesapla
    const duration = arrivalTime.getTime() - date.getTime();

    let returnDepartureTime = null;
    let returnArrivalTime = null;

    if (returnDate) {
      // Dönüş kalkış zamanını hesapla (dönüş tarihinden itibaren 0-12 saat arası)
      returnDepartureTime = new Date(returnDate.getTime() + Math.random() * 43200000);
      
      // Dönüş uçuşu için minimum süre (gidiş uçuşu kadar)
      const minReturnDuration = duration;
      // Dönüş uçuşu için maksimum ek süre (6 saat)
      const maxAdditionalDuration = 21600000;
      // Dönüş uçuşu süresini hesapla
      const returnDuration = minReturnDuration + Math.random() * maxAdditionalDuration;
      // Dönüş varış zamanını hesapla
      returnArrivalTime = new Date(returnDepartureTime.getTime() + returnDuration);
    }

    return {
      agency,
      departure,
      destination,
      price,
      // Eğer mesafe 5'ten büyükse, tarihi ileriye al (her birim mesafe için 1 gün)
      date: randomDistance > 5 ? new Date(date.getTime() + randomDistance * 86400000) : date,
      arrivalTime,
      departureTime: date,
      duration,
      returnDepartureTime,
      returnArrivalTime
    };
  // Fiyata göre sırala
  }).sort((a, b) => a.price - b.price);
};

const TicketCard = ({ ticket, selectedOption }) => (
  <Card hoverable style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
        <Tag color="blue" style={{ marginBottom: '5px' }}>{selectedOption}</Tag>
    </div>
    <Row align="middle">
      <Col span={20} sm={24} xs={24}>
        <Row justify='center'>
          <Col span={24}>
            <Row span={24} align="middle" justify='center'>
              <h2 style={{ fontSize: '24px' }}>{ticket.agency.name}</h2>
            </Row>
          </Col>
          <Col span={8} sm={24} xs={24} lg={12} xl={8}>
            <p style={{ fontSize: '16px' }}>From: {ticket.destination}</p>
            <hr />
          </Col>
          <Col span={8} sm={24} xs={24} lg={12} xl={8}>
            <p style={{ fontSize: '16px' }}>To: {ticket.departure}</p>
            <hr />
          </Col>
          <Col span={8} sm={24} xs={24} lg={12} xl={8}>
            <p style={{ fontSize: '16px' }}>Price: {ticket.price} BDT</p>
            <hr />
          </Col>
          <Col span={8} sm={24} xs={24} lg={12} xl={8}>
            <p style={{ fontSize: '16px' }}>Departure Time: {ticket.departureTime.toLocaleString()}</p>
            <hr />
          </Col>
          <Col span={8} sm={24} xs={24} lg={12} xl={8}>
            <p style={{ fontSize: '16px' }}>Arrival Time: {ticket.arrivalTime.toLocaleString()}</p>
            <hr />
          </Col>
          <Col span={8} sm={24} xs={24} lg={12} xl={8}>
            <p style={{ fontSize: '16px' }}>Duration: {Math.floor(ticket.duration / (1000 * 60 * 60))} hours {Math.floor((ticket.duration % (1000 * 60 * 60)) / (1000 * 60))} minutes</p>
            <hr />
          </Col>
          {ticket.returnDepartureTime && (
            <>
              <Col span={8} sm={24} xs={24} lg={12} xl={8}>
                <p style={{ fontSize: '16px' }}>Return Departure: {ticket.returnDepartureTime.toLocaleString()}</p>
                <hr />
              </Col>
              <Col span={8} sm={24} xs={24} lg={12} xl={8}>
                <p style={{ fontSize: '16px' }}>Return Arrival: {ticket.returnArrivalTime.toLocaleString()}</p>
                <hr />
              </Col>
              <Col span={8} sm={24} xs={24} lg={12} xl={8}>
                <p style={{ fontSize: '16px' }}>Return Duration: {Math.floor((ticket.returnArrivalTime.getTime() - ticket.returnDepartureTime.getTime()) / (1000 * 60 * 60))} hours {Math.floor(((ticket.returnArrivalTime.getTime() - ticket.returnDepartureTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60))} minutes</p>
                <hr />
              </Col>
            </>
          )}
        </Row>
      </Col>
      <Col span={3} sm={24} xs={24} style={{ textAlign: 'right' }}>
        <Row justify='center'><Rate disabled defaultValue={ticket.agency.rating} /></Row>
        <Row justify='center' style={{ marginTop: '10px' }}>
          <Button style={{ backgroundColor: '#3d5cb8', color: 'white' }}>Select Seat</Button>
        </Row>
      </Col>
    </Row>
  </Card>
);

const Search = () => {
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [selectedStartLocation, setSelectedStartLocation] = useState('None');
  const [selectedDestinationLocation, setSelectedDestinationLocation] = useState('None');
  const [selectedOption, setSelectedOption] = useState('Non-AC');
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [appliedOption, setAppliedOption] = useState('Non-AC');
  const handleSearch = () => {
    if (selectedStartLocation !== 'None' && selectedDestinationLocation !== 'None') {
      setIsLoading(true);
      setAppliedOption(selectedOption);  
      setTimeout(() => {
        const newTickets = generateRandomTickets(selectedStartLocation, selectedDestinationLocation, date, returnDate);
        setTickets(newTickets);
        setSearched(true);
        setIsLoading(false);
      }, 500);
    } else {
      setSearched(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleReturnTripChange = (e) => {
    setIsReturnTrip(e.target.checked);
    if (!e.target.checked) {
      setReturnDate(null);
    }
  };

  return (
    <div>
      <div className="search container section">
        <div className="sectionContainer grid">
          <div className="btns flex">
            {["Business Class Trip", "Air Conditioning supported", "Non-AC"].map((option) => (
              <div 
                key={option} 
                className={`singleBtn ${selectedOption === option ? 'active' : ''}`}
                onClick={() => handleOptionClick(option)}
                style={{ cursor: 'pointer' }}
              >
                <span>{option}</span>
              </div>
            ))}
          </div>
          <div className="searchInputs flex">
            <div className="singlInput flex">
              <div className="iconDiv">
                <HiOutlineLocationMarker className="icon" />
              </div>
              <div className="texts">
                <h5>From</h5>
                <Select
                  size="large"
                  name="start_location"
                  placeholder="Select start location"
                  value={selectedStartLocation}
                  onChange={setSelectedStartLocation}
                  options={LOCATION_OPTIONS}
                  style={{ width: 200 }}
                />
              </div>
            </div>
            <div className="singlInput flex">
              <div className="iconDiv">
                <RiAccountPinCircleLine className="icon" />
              </div>
              <div className="texts">
                <h5>To</h5>
                <Select
                  size="large"
                  name="destination"
                  placeholder="Select destination location"
                  value={selectedDestinationLocation}
                  onChange={setSelectedDestinationLocation}
                  style={{ width: 200 }}
                  options={LOCATION_OPTIONS}
                />
              </div>
            </div>
            <div className="singlInput flex">
              <div className="iconDiv">
                <SlCalender className="icon" />
              </div>
              <div className="texts">
                <h5>Date of Journey</h5>
                <DatePicker
                  showTimeSelect
                  minTime={new Date(0, 0, 0, 12, 30)}
                  maxTime={new Date(0, 0, 0, 19, 0)}
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
            </div>
            <div className="singlInput flex">
            <Checkbox checked={isReturnTrip} onChange={handleReturnTripChange}>Add Return</Checkbox>
            {isReturnTrip && (<>
            <div className="iconDiv">
                <SlCalender className="icon" />
              </div>
              <div className="texts">
              <h5>Date of Return</h5>
                  <DatePicker
                    showTimeSelect
                    minTime={new Date(0, 0, 0, 12, 30)}
                    maxTime={new Date(0, 0, 0, 19, 0)}
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    placeholderText="Select return date"
                    style={{ marginTop: '10px' }}
                  />
               
              </div> </>)}
            </div>
          </div>
          <div>
            <div className="btns">
              <Button className="btn btnBlock flex" type="primary" onClick={handleSearch}>
                Find Specific Bus Info
              </Button>
            </div>
          </div>
        </div>
        {searched && (
          <Row gutter={[16, 16]} style={{ marginTop: '20px', padding: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {isLoading ? (
              <Col span={24}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin size="large" />
                </div>
              </Col>
            ) : (
              tickets.map((ticket, index) => (
                <Col key={index} span={24}>
                  <TicketCard ticket={ticket} selectedOption={appliedOption} />
                </Col>
              ))
            )}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Search;