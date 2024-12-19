import styled from "styled-components";
import React from "react";


const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 650px;
    height: 240px;
    min-width: 400px;
    max-width: 700px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 6px;
    user-select: none;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.2);
    align-items: center;
    @media (max-width: 1000px) {
        
        width: 100%;
        height: 180px;
    }
`;

const NoticeRow = styled.div`
    flex-direction: row;
    width: 92%;
    height: 18%;
    box-shadow: 0 1px 0 0 rgba(0,0,0,0.6);
    display: flex;
`


const NoticeRowText = styled.div`
    flex: 4;
    font-weight: 400;
    height: 100%;
    align-content: center;
    font-size: 14px;
    @media (max-width: 1000px) {
        font-size: 11px;

    }
`


const Notice : React.FC = () => {
    return (
      <NoticeContainer>
          <NoticeRow>
              <NoticeRowText style={{paddingLeft: "4px", fontWeight: "bolder"}}>
                  공지사항
              </NoticeRowText>
              <NoticeRowText style={{flex: "1", fontWeight: "bolder"}}>
                  날짜
              </NoticeRowText>
              <NoticeRowText style={{flex: "1", fontWeight: "bolder"}}>
                  작성자
              </NoticeRowText>
          </NoticeRow>
          <NoticeRow style={{boxShadow: "none", height: "12%"}}>
              <NoticeRowText style={{paddingLeft: "4px"}}>
                  Test 공지사항입니다.
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  2024.01.01
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  Cloud관리자
              </NoticeRowText>
          </NoticeRow>
          <NoticeRow style={{boxShadow: "none", height: "12%"}}>
              <NoticeRowText style={{paddingLeft: "4px"}}>
                  안녕하세요 CloudPC관리자입니다.
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  2024.01.01
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  Cloud관리자
              </NoticeRowText>
          </NoticeRow>
          <NoticeRow style={{boxShadow: "none", height: "12%"}}>
              <NoticeRowText style={{paddingLeft: "4px"}}>
                  안녕하세요 CloudPC관리자입니다.
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  2024.01.01
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  Cloud관리자
              </NoticeRowText>
          </NoticeRow>
          <NoticeRow style={{boxShadow: "none", height: "12%"}}>
              <NoticeRowText style={{paddingLeft: "4px"}}>
                  안녕하세요 CloudPC관리자입니다.
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  2024.01.01
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  Cloud관리자
              </NoticeRowText>
          </NoticeRow>
          <NoticeRow style={{boxShadow: "none", height: "12%"}}>
              <NoticeRowText style={{paddingLeft: "4px"}}>
                  안녕하세요 CloudPC관리자입니다.
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  2024.01.01
              </NoticeRowText>
              <NoticeRowText style={{flex: "1"}}>
                  Cloud관리자
              </NoticeRowText>
          </NoticeRow>

      </NoticeContainer>
    );
};

export {Notice};
