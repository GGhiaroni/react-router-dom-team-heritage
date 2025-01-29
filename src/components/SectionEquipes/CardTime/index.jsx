import {
  IoIosArrowRoundForward,
  IoIosHeart,
  IoIosHeartEmpty,
} from "react-icons/io";

import { useContext } from "react";
import styled from "styled-components";
import { TimesContext } from "../../../contextos/Times";
import useFavoritoContext from "../../../hooks/useFavoritos";

const CardEstilizado = styled.div`
  background-color: #ffffff;
  width: 250px;
  height: 250px;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 120px;
    height: 120px;
    margin-top: 15px;
    object-fit: contain;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin-top: 15px;
    padding: 10px 0;
    background-color: #333;
    width: 100%;
  }
`;

const CardFooter = styled.div`
  background-color: #f8f8f8;
  padding: 10px 15px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 1px solid #ddd;

  button {
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: #007bff;
    cursor: pointer;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      color: #0056b3;
    }
  }
`;

const CardEstilizadoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px 5px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const CardTime = () => {
  const { favorito, adicionarFavoritos } = useFavoritoContext();
  const { times } = useContext(TimesContext);

  return (
    <CardEstilizadoContainer>
      {times.map((time) => {
        const ehFavorito = favorito.some((f) => f.id === time.id);

        const icone = ehFavorito ? (
          <IoIosHeart
            size={22}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: "#d11919",
              transition: "transform 0.2s ease, color 0.2s ease",
            }}
            onClick={() => {
              adicionarFavoritos(time);
            }}
          />
        ) : (
          <IoIosHeartEmpty
            size={18}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              transition: "transform 0.2s ease, color 0.2s ease",
            }}
            onClick={() => {
              adicionarFavoritos(time);
            }}
          />
        );

        return (
          <CardEstilizado key={time.id}>
            {icone}
            <img src={time.foto_escudo} alt={`escudo ${time.nome}`} />
            <h3>{time.nome}</h3>
            <CardFooter>
              <button>
                Saiba mais <IoIosArrowRoundForward size={20} />
              </button>
            </CardFooter>
          </CardEstilizado>
        );
      })}
    </CardEstilizadoContainer>
  );
};

export default CardTime;
