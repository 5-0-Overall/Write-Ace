import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { GradingService } from "./grading.service";
import {FeedbackResponseEntity } from "./entity/response.entity";
import { AuthGuard } from "../guard/auth.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorator/roles.decorator";
import { Role } from "../const/enum/roles.enum";
import { RolesGuard } from "../guard/role.guard";
import { IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";




@ApiTags('grading')
@Controller('grading')
export class GradingController {

    constructor(private readonly gradingService: GradingService) {}

    @Post(':id')
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.TEACHER)
    @ApiOperation({ summary: 'Grade essay' })
    async gradeEssay(
        @Param('id') id: number, 
        @Body() feedbackDto: FeedbackResponseEntity,
        @Req() req: any
    ) {
        console.log(req)
        return await this.gradingService.gradeEssay(id, feedbackDto, req.user.sub);
    }

}