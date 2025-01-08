import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpgradeVocabularyAndGrammarItem {
  @IsNumber()
  comment_id: number;

  @IsString()
  your_words: string;

  @IsString()
  recommend_upgrade_words: string;

  @IsString()
  explanation: string;
}

export class IntroductionFeedback {
  @IsString()
  clear_position: string;

  @IsString()
  relevance: string;

  @IsString()
  brief_overview: string;

  @IsString()
  improved_introduction: string;
}

export class MainPointsFeedbackSuggestionsForImprovement {
  @IsString()
  @IsOptional()
  specific_challenges?: string;

  @IsString()
  @IsOptional()
  potential_solutions?: string;

  @IsString()
  @IsOptional()
  clarify_specify?: string;

  @IsString()
  @IsOptional()
  balance_argument?: string;

  @IsString()
  @IsOptional()
  clarity_and_examples?: string;
}

export class MainPointsFeedback {
  @IsString()
  argumentative_logic: string;

  @IsString()
  @IsOptional()
  overgeneralizations?: string;

  @IsString()
  @IsOptional()
  relevance_effectiveness?: string;

  @ValidateNested()
  @Type(() => MainPointsFeedbackSuggestionsForImprovement)
  @IsOptional()
  suggestions_for_improvement?: MainPointsFeedbackSuggestionsForImprovement;
}

export class MainPoint {
  @IsNumber()
  paragraph: number;

  @ValidateNested()
  @Type(() => MainPointsFeedback)
  feedback: MainPointsFeedback;
}

export class ConclusionFeedbackDetails {
  @IsString()
  summary_strength: string;

  @IsString()
  @IsOptional()
  suggestions?: string;
}

export class ConclusionFeedback {
  @ValidateNested()
  @Type(() => ConclusionFeedbackDetails)
  feedback: ConclusionFeedbackDetails;
}

export class TaskResponseFeedbackDetails {
  @IsString()
  detailed_explanation: string;

  @IsString()
  how_to_improve: string;
}

export class TaskResponseFeedback {
  @ValidateNested()
  @Type(() => TaskResponseFeedbackDetails)
  answer_all_parts_of_question: TaskResponseFeedbackDetails;

  @ValidateNested()
  @Type(() => TaskResponseFeedbackDetails)
  present_clear_position_throughout: TaskResponseFeedbackDetails;

  @ValidateNested()
  @Type(() => TaskResponseFeedbackDetails)
  present_extend_support_ideas: TaskResponseFeedbackDetails;

  @ValidateNested()
  @Type(() => TaskResponseFeedbackDetails)
  stay_on_topic: TaskResponseFeedbackDetails;
}

export class TaskResponse {
  @IsNumber()
  band_score: number;

  @ValidateNested()
  @Type(() => TaskResponseFeedback)
  feedback: TaskResponseFeedback;
}

export class CoherenceCohesionFeedbackDetails {
  @IsString()
  detailed_explanation: string;

  @IsString()
  how_to_improve: string;
}

export class CoherenceCohesionFeedback {
  @ValidateNested()
  @Type(() => CoherenceCohesionFeedbackDetails)
  organize_information_logically: CoherenceCohesionFeedbackDetails;

  @ValidateNested()
  @Type(() => CoherenceCohesionFeedbackDetails)
  use_paragraphs: CoherenceCohesionFeedbackDetails;

  @ValidateNested()
  @Type(() => CoherenceCohesionFeedbackDetails)
  use_cohesive_devices: CoherenceCohesionFeedbackDetails;
}

export class CoherenceCohesion {
  @IsNumber()
  band_score: number;

  @ValidateNested()
  @Type(() => CoherenceCohesionFeedback)
  feedback: CoherenceCohesionFeedback;
}

export class LexicalResourceFeedbackDetails {
  @IsString()
  detailed_explanation: string;

  @IsString()
  how_to_improve: string;
}

export class LexicalResourceFeedback {
  @ValidateNested()
  @Type(() => LexicalResourceFeedbackDetails)
  wide_range_vocabulary: LexicalResourceFeedbackDetails;

  @ValidateNested()
  @Type(() => LexicalResourceFeedbackDetails)
  use_precise_vocabulary: LexicalResourceFeedbackDetails;

  @ValidateNested()
  @Type(() => LexicalResourceFeedbackDetails)
  correct_spelling: LexicalResourceFeedbackDetails;
}

export class LexicalResource {
  @IsNumber()
  band_score: number;

  @ValidateNested()
  @Type(() => LexicalResourceFeedback)
  feedback: LexicalResourceFeedback;
}

export class GrammaticalRangeAccuracyFeedbackDetails {
  @IsString()
  detailed_explanation: string;

  @IsString()
  how_to_improve: string;
}

export class GrammaticalRangeAccuracyFeedback {
  @ValidateNested()
  @Type(() => GrammaticalRangeAccuracyFeedbackDetails)
  wide_range_structures: GrammaticalRangeAccuracyFeedbackDetails;

  @ValidateNested()
  @Type(() => GrammaticalRangeAccuracyFeedbackDetails)
  grammar_punctuation_accuracy: GrammaticalRangeAccuracyFeedbackDetails;
}

export class GrammaticalRangeAccuracy {
  @IsNumber()
  band_score: number;

  @ValidateNested()
  @Type(() => GrammaticalRangeAccuracyFeedback)
  feedback: GrammaticalRangeAccuracyFeedback;
}

export class FeedbackResponseEntity {
  @ValidateNested()
  @Type(() => UpgradeVocabularyAndGrammarItem)
  @IsArray()
  upgrade_vocabulary_and_grammar: UpgradeVocabularyAndGrammarItem[];

  @ValidateNested()
  @Type(() => IntroductionFeedback)
  @IsObject()
  introduction: IntroductionFeedback;

  @ValidateNested()
  @Type(() => MainPoint)
  @IsArray()
  main_points: MainPoint[];

  @ValidateNested()
  @Type(() => ConclusionFeedback)
  @IsObject()
  conclusion: ConclusionFeedback;

  @ValidateNested()
  @Type(() => TaskResponse)
  @IsObject()
  task_response: TaskResponse;

  @ValidateNested()
  @Type(() => CoherenceCohesion)
  @IsObject()
  coherence_cohesion: CoherenceCohesion;

  @ValidateNested()
  @Type(() => LexicalResource)
  @IsObject()
  lexical_resource: LexicalResource;

  @ValidateNested()
  @Type(() => GrammaticalRangeAccuracy)
  @IsObject()
  grammatical_range_accuracy: GrammaticalRangeAccuracy;
}
