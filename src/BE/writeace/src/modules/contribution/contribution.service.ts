import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContributionEntity } from './entity/contribution.entity';
import * as moment from 'moment';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(ContributionEntity)
    private contributionRepository: Repository<ContributionEntity>,
  ) {}

  async getContributionsByUserId(userId: number, year: number = new Date().getFullYear()) {
    const startDate = moment().year(year).startOf('year');
    const endDate = moment().year(year).endOf('year');

    const contributions = await this.contributionRepository
      .createQueryBuilder('contribution')
      .where('contribution.user_id = :userId', { userId })
      .andWhere('contribution.date BETWEEN :startDate AND :endDate', {
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
      })    
      .getMany();

    // Tính tổng số contribution trong năm
    const totalContributions = contributions.reduce((sum, contrib) => sum + contrib.count, 0);

    // Tạo map contributions theo ngày
    const contributionMap = contributions.reduce((acc, contrib) => {
      const dateKey = moment(contrib.date).format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = 0;
      }
      // Cộng dồn giá trị
      acc[dateKey] += contrib.count;
      return acc;
    }, {} as Record<string, number>);

    const returnData ={
        total: totalContributions,
        year,
        contributions: contributionMap
      };

    console.log(`getContributionsByUserId: ${userId}`);
    console.log(returnData);
    return returnData;
  }

  async incrementContribution(userId: number): Promise<void> {
    const today = moment().startOf('day').toDate();
    
    let contribution = await this.contributionRepository.findOne({
      where: {
        userId,
        date: today,
      },
    });

    if (contribution) {
      contribution.count += 1;
    } else {
      contribution = this.contributionRepository.create({
        userId,
        count: 1,
        date: today,
      });
    }

    await this.contributionRepository.save(contribution);
  }
}