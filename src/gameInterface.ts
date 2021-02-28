import { Position, ChessPiece, Player } from "./gameTypes";

export interface Game {
    gameId: string,
    turn: number,
    winner: Player | "Tie",
    gameBoard: BoardHash,
    history: History
}

export interface History { movementLog: Movement[], beatenLog: BeatenPieces }
export interface Movement { orgPos: Position, newPos: Position, chessPiece: ChessPiece, player: Player }
export interface BeatenPieces { white: ChessPiece[], black: ChessPiece[] }

export interface BoardHash { [pos: string]: Chessfield }
export interface Chessfield { pos: Position, content: null | ChessPiece, player: Player }

export interface MoveTemplate { [chessPiece: string]: (pos: Position, board: BoardHash) => Promise<Position[]> }
export interface PossibleMove { pos: Position | null, lastPossiblePos: boolean }