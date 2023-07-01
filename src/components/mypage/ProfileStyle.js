import { styled, css } from "styled-components";

export const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 120px;
    margin-top: 30px;
  `,

  ProfileImageWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProfileImageBox: styled.div`
    width: 300px;
    height: 300px;
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
    gap: 15px;
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

    background-color: #e4dccf;

    ${({ btn }) => {
      switch (btn) {
        case "imageBtn":
          return css`
            width: 150px;
            height: 30px;
            margin-right: 5px;
          `;
        case "profileBtn":
          return css`
            width: 319px;
            height: 40px;

            margin-top: 20px;
          `;
      }
    }}
  `,
};
