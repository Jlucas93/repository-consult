import React from "react"
import { useParams } from "react-router-dom"
import * as S from './style'

export default function Repository() {

  const { repository } = useParams();

  return (
    <>
      <S.Title>Page repository</S.Title>
      <S.Title>{repository}</S.Title>
    </>
  )
}