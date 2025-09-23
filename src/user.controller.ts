import { ExpressRequest } from 'express';
import { Controller, Get, Post, Req, Request, Query, Body, Headers, Session, Ip, Param, Response } from '@nestjs/common'

@Controller('/users')
export class UserController {
    @Get('/list')
    getUserList(@Req() req: ExpressRequest, age, @Request() request: ExpressRequest): string {
        // console.log(req, request);
        return request.url+'======='+req.method + '-----'+age
    }
    @Get('/id')
    getHello2(@Query() query, @Query('id') id: string): string {
        return 'Hello World2!  UserId:'+ query.id+ '---'+id
    }

    @Get('/headers')
    getHeaders(@Headers() header: any, @Headers('connection') connection: string) {
        return `headers: ${JSON.stringify(header)}---connection: ${connection}`;
    }

    @Get('/session')
    getSession(@Session() session, @Session('pageViews') pageViews) {
        session.pageViews = session.pageViews ? session.pageViews += 1 : 1;
       return typeof session === 'string' ? session : JSON.stringify(session) + '---' + pageViews;
    }

    @Get('/ip')
    getId(@Ip() ip: string): string {
        return `UserIp: ${ip}`;
    }

    @Get(':userName/userinfo/:age')
    getUserInfo(@Param('userName') userName, @Param('age') age): string {
        return `UserInfo: ${userName}---${age}`;
    }

    @Post('/add')
    addUser(@Body('username') username: string, @Body('age') age: number) {
        return {
            code: 0,
            msg: 'ok',
            data: {
                username,
                age
            }
        }
    }

    @Post('/res')
    getRes(@Response() res) {
        res.send({ code: 0, msg: 'ok', data: res.req.body})
        // return res.send(res);
    }

    @Post('/passthrough')
    passthrough(@Response({ passthrough: true }) res) {
        // res.send({ code: 0, msg: 'ok', data: res.req.body})
        // return res.send(res);
        return res.req.body
    }
}