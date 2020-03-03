import { grpc } from "@improbable-eng/grpc-web";
const service = require("../_proto/examplecom/library/book_service_pb_service");
import {
  QueryBooksRequest,
  Book,
  GetBookRequest
} from "../_proto/examplecom/library/book_service_pb";
const msg = require("../_proto/examplecom/library/book_service_pb");
//console.log(msg);
const { improbRPC } = require("testreactrpc");
const rpc = improbRPC;
declare const USE_TLS: boolean;
const host = USE_TLS ? "https://localhost:9091" : "http://localhost:9090";
rpc.build(msg, service, host);
//console.log("Hiiiiii");
const userMsg = {
  msgType: "GetBookRequest",
  isbn: 60929871
};
console.log(rpc);
let temp = rpc.functions.BookService.GetBook(userMsg, {}, (err, res) => {
  console.log("Response:   ", res);
});
console.log("Temp", temp);
console.log(service);
function getBook() {
  const getBookRequest = new GetBookRequest();
  getBookRequest.setIsbn(60929871);
  const client = grpc.client(service.BookService.GetBook, {
    host: host
  });
  client.start();
  client.send(getBookRequest);
  client.onMessage((message: Book) => {
    console.log("onMessage", message.toObject());
  });
  client.finishSend();
}

getBook();

function queryBooks() {
  const queryBooksRequest = new QueryBooksRequest();
  queryBooksRequest.setAuthorPrefix("Geor");
  const client = grpc.client(service.BookService.QueryBooks, {
    host: host
  });
  client.onHeaders((headers: grpc.Metadata) => {
    console.log("queryBooks.onHeaders", headers);
  });
  client.onMessage((message: Book) => {
    console.log("queryBooks.onMessage", message.toObject());
  });
  client.onEnd((code: grpc.Code, msg: string, trailers: grpc.Metadata) => {
    console.log("queryBooks.onEnd", code, msg, trailers);
  });
  client.start();
  client.send(queryBooksRequest);
}
