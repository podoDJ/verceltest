import { styled } from "styled-components";

export const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 80px;
    margin-top: 30px;
  `,

  ProfileImageWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProfileImageBox: styled.div`
    width: 280px;
    height: 280px;
    overflow: hidden;
    border-radius: 100%;
    margin: 30px;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
  `,
  NameBox: styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,

  Textarea: styled.input`
    box-sizing: border-box;
    width: 500px;
    height: 100px;

    background-color: var(--color-bg);
    border: 1px solid lightgray;
    border-radius: 3px;

    padding: 15px;
  `,
};
