import { styled, css } from "styled-components";

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

  ImageUploadBox: styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
  `,

  ImageInput: styled.input`
    display: none;
  `,

  FileBoxLabel: styled.label`
    display: inline-block;
    padding: 10px 20px;
    vertical-align: middle;
    cursor: pointer;
    height: 30px;
    margin-left: 10px;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
  `,
  MemberInput: styled.input`
    width: 300px;
    height: 40px;
    padding-left: 15px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
  `,

  Contents: styled.div`
    display: flex;
    gap: 30px;
    margin: 10px;
  `,

  ContentsTitle: styled.p`
    cursor: pointer;
  `,

  contentsBody: styled.div`
    background-color: #ffbf9b;
    border-radius: 5px;
    margin-top: 15px;
    width: 100%;
    height: 100%;
  `,

  Btns: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px;

    ${({ btn }) => {
      switch (btn) {
        case "imageBtn":
          return css`
            width: 150px;
            height: 30px;
          `;
        case "nameBtn":
          return css`
            width: 50px;
            height: 30px;
          `;
        case "introBtn":
          return css`
            width: 80px;
            height: 30px;
          `;
      }
    }}
  `,
};
