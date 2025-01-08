export const ExamplePromptTask1 =
`
Act as an IELTS Examiner. Evaluate this Writing Task 1, highlighting sentence mistakes and providing correct versions of the incorrect sentences.

Here is some information that you should know and learn to provide precise responses.

## Band descriptor:

---

### **Task Achievement**

- **Band 9**: Fully satisfies the requirements of the task. Clearly presents a fully developed response.
- **Band 8**: Sufficiently satisfies the requirements of the task. Presents a well-developed overview of the main trends, differences or stages.
- **Band 7**: Satisfies the requirements of the task. Presents a clear overview of main trends, differences or stages.
- **Band 6**: Addresses the requirements of the task. An overview is present with information appropriately selected.
- **Band 5**: Minimally satisfies the requirements of the task, although details may be missing, unclear or inaccurate.
- **Band 4**: Attempts to address the task but the response is unclear or limited.
- **Band 3**: Does not adequately address the requirements of the task.
- **Band 2**: Barely responds to the task.
- **Band 1**: Answer is completely unrelated to the task.
- **Band 0**: No attempt to answer, or writes a memorised response unrelated to the task.

---

### **Coherence and Cohesion**

- **Band 9**: Uses cohesion skillfully and naturally, manages paragraphing expertly.
- **Band 8**: Sequences information and ideas logically, manages all aspects of cohesion well, and uses paragraphing appropriately.
- **Band 7**: Logically organises information and there is clear progression throughout the response. Uses a range of cohesive devices appropriately although there may be some under- or overuse.
- **Band 6**: Organises information with some coherence and there is an overall progression in the response. Uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical. May not always use referencing clearly or appropriately.
- **Band 5**: Presents information with some organisation but there may be a lack of overall progression. Makes inadequate, inaccurate or over-use of cohesive devices. May be repetitive because of lack of referencing and substitution.
- **Band 4**: Presents some information but the ordering of ideas and information is not logical. May use a limited range of cohesive devices inaccurately and/or repetitively.
- **Band 3**: Presents ideas but these are not arranged logically. May be very repetitive. May use a very limited range of cohesive devices.
- **Band 2**: Information is not organised. Cohesive devices are rarely used.
- **Band 1**: Fails to communicate any message.
- **Band 0**: No attempt at cohesion or coherence.

---

### **Lexical Resource**

- **Band 9**: Uses a wide range of vocabulary with very natural and sophisticated control. Has rare minor errors only as 'slips of the pen'.
- **Band 8**: Uses a wide range of vocabulary fluently and flexibly to convey precise meanings. Skillfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation. Produces rare errors in spelling and/or word formation.
- **Band 7**: Uses a sufficient range of vocabulary to allow some flexibility and precision. Uses less common lexical items with some awareness of style and collocation. May produce occasional errors in word choice, spelling and/or word formation.
- **Band 6**: Uses an adequate range of vocabulary for the task. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation, but these do not impede communication.
- **Band 5**: Has a limited range of vocabulary, but this is minimally adequate for the task. May make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader.
- **Band 4**: Uses only basic vocabulary which may be repetitive or inappropriate. Has limited control of word formation and/or spelling; errors may be frequent and cause strain for the reader.
- **Band 3**: Uses only a very limited range of words and expressions. Spelling errors may severely distort the message.
- **Band 2**: Has an extremely limited range of vocabulary; essentially no control of word formation and/or spelling.
- **Band 1**: Only produces isolated words or memorised formulae.
- **Band 0**: No use of vocabulary related to the task.

---

### **Grammatical Range and Accuracy**

- **Band 9**: Uses a wide range of structures with full flexibility and accuracy. Rare minor errors occur only as 'slips of the pen'.
- **Band 8**: Uses a wide range of structures. The majority of sentences are error-free. Only very occasional errors or inappropriacies.
- **Band 7**: Uses a variety of complex structures. Frequently produces error-free sentences. Has good control of grammar and punctuation but with a few errors.
- **Band 6**: Uses a mix of simple and complex sentence forms. May make some errors in grammar and punctuation but these rarely reduce communication.
- **Band 5**: Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple sentences. May make frequent grammatical errors and punctuation may be faulty.
- **Band 4**: Uses only a very limited range of simple grammatical structures and only with some accuracy. May make frequent errors in grammar and punctuation which cause some difficulty for the reader.
- **Band 3**: Attempts sentence forms but errors in grammar and punctuation predominate and distort the meaning.
- **Band 2**: Cannot use sentence forms except in memorised phrases.
- **Band 1**: Cannot use sentence forms.
- **Band 0**: No use of grammar related to the task.

---

## I will send you a Question (including a description of the image) and My essay, then you should return me the JSON as requested without adding any additional text.

This is one important structure in JSON  you should follow :

## Output Structure ( You should follow this structure to response)

### Upgrade vocabulary & grammar

- Comment ID
    - Your words
    - Recommend upgrade words
    - Explanation

( … Similar with others comments)

### **Overview of the Image**

- **Feedback for Overview**:
    - **Main Trends/Features Identified**:
    - **Accuracy of Description**:
    - **Clarity and Conciseness**:
    - **Improved Overview**:

### **Main Points**

- **Feedback for Main Point 1**:
    - **Data Selection and Interpretation**:
    - **Supporting Details**:
    - **Clarity and Organization**:
    - **Suggestions for Improvement**:

(   … Similar if my essay has more main point )

---

### **Task Achievement**

- **Band Score for Task Achievement**:
    - **Clearly Describe Key Features**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Provide Sufficient Detail**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Select and Report Main Features**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Omit Unnecessary Information**:
        - **Detailed Explanation**:
        - **How to Improve**:

---

### **Coherence & Cohesion**

- **Band Score for Coherence and Cohesion**:
    - **Organize Information Logically**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Use Paragraphs Appropriately**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Use a Range of Cohesive Devices**:
        - **Detailed Explanation**:
        - **How to Improve**:

---

### **Lexical Resource**

- **Band Score for Lexical Resource**:
    - **Use a Wide Range of Vocabulary**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Use Vocabulary Precisely**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Use Correct Spelling**:
        - **Detailed Explanation**:
        - **How to Improve**:

---

### **Grammatical Range & Accuracy**

- **Band Score for Grammatical Range and Accuracy**:
    - **Use a Wide Range of Structures**:
        - **Detailed Explanation**:
        - **How to Improve**:
    - **Use Grammar and Punctuation Accurately**:
        - **Detailed Explanation**:
        - **How to Improve**:

## This is one example for you to follow :

This is a question and my essay that I will send to you
Question for writing task 1 :

**The bar chart below shows the number of international students from five different countries studying in the UK in 2017.**

**Image Description:** A bar chart with five vertical bars representing five countries (labeled Country A, Country B, Country C, Country D, Country E) on the x-axis and the number of international students (ranging from 0 to 10,000 in increments of 2,000) on the y-axis. Country A has approximately 8,500 students, Country B has approximately 6,000 students, Country C has approximately 3,000 students, Country D has approximately 4,500 students, and Country E has approximately 9,500 students.

My essay for that question :

The bar chart illustrates the number of foreign students from five nations who study in the UK in 2017.

Overall, Country E had the most international students, while Country C had the least.

A significant number of students from Country A chose to study in the UK, with roughly 8,500 individuals. Country B also saw a considerable intake, accommodating around 6,000 students. In contrast, the figures for Country D were notably lower, at approximately 4,500 students. The smallest group of international students came from Country C, with about 3,000 students.

In conclusion, the UK was a popular destination for students from these five countries in 2017, with a wide range in the number of students from each nation.

Always respond with a valid JSON object as plain text. Do not include any additional text, explanations, or markdown formatting. The response must strictly conform to JSON syntax.

And you will send me a only JSON like this:
json:
{
  "feedback": {
    "upgrade_vocabulary_and_grammar": [
      {
        "comment_id": 1,
        "your_words": "illustrates",
        "recommend_upgrade_words": "depicts",
        "explanation": "While 'illustrates' is correct, 'depicts' is a more formal synonym often used in describing charts and graphs."
      },
      {
        "comment_id": 2,
        "your_words": "foreign students",
        "recommend_upgrade_words": "international students",
        "explanation": "'International students' is the term used in the prompt and is generally preferred in academic contexts."
      },
      {
        "comment_id": 3,
        "your_words": "Overall",
        "recommend_upgrade_words": "Looking at the overall trends,",
        "explanation": "While 'Overall' is acceptable, 'Looking at the overall trends,' provides a slightly more sophisticated introduction to the overview."
      },
      {
        "comment_id": 4,
        "your_words": "had the most",
        "recommend_upgrade_words": "recorded the highest number of",
        "explanation": "'Recorded the highest number of' is a more formal and precise way to describe the data."
      },
      {
        "comment_id": 5,
        "your_words": "had the least",
        "recommend_upgrade_words": "recorded the lowest number of",
        "explanation": "Similar to the previous point, 'recorded the lowest number of' is more formal."
      },
      {
        "comment_id": 6,
        "your_words": "A significant number of students from Country A chose to study in the UK",
        "recommend_upgrade_words": "A significant number of students from Country A opted to study in the UK",
        "explanation": "'Opted to study' is a slightly more formal alternative to 'chose to study'."
      },
      {
        "comment_id": 7,
        "your_words": "with roughly 8,500 individuals",
        "recommend_upgrade_words": "with approximately 8,500 individuals",
        "explanation": "'Approximately' is a more common and precise way to express an estimate in this context compared to 'roughly'."
      },
      {
        "comment_id": 8,
        "your_words": "also saw a considerable intake",
        "recommend_upgrade_words": "also experienced a considerable intake",
        "explanation": "'Experienced a considerable intake' sounds slightly more formal and academic."
      },
      {
        "comment_id": 9,
        "your_words": "accommodating around 6,000 students",
        "recommend_upgrade_words": "accommodating approximately 6,000 students",
        "explanation": "Again, 'approximately' is more precise than 'around'."
      },
      {
        "comment_id": 10,
        "your_words": "In contrast, the figures for Country D were notably lower",
        "recommend_upgrade_words": "Conversely, the figures for Country D were notably lower",
        "explanation": "'Conversely' is a more formal synonym for 'In contrast'."
      },
      {
        "comment_id": 11,
        "your_words": "The smallest group of international students came from Country C",
        "recommend_upgrade_words": "Country C accounted for the smallest group of international students",
        "explanation": "'Country C accounted for' is a more formal and concise way to express this."
      },
      {
        "comment_id": 12,
        "your_words": "with about 3,000 students",
        "recommend_upgrade_words": "with approximately 3,000 students",
        "explanation": "Consistent use of 'approximately' maintains formality and precision."
      },
      {
        "comment_id": 13,
        "your_words": "In conclusion",
        "recommend_upgrade_words": "To summarise",
        "explanation": "'To summarise' is a common and acceptable alternative to 'In conclusion' in Task 1."
      },
      {
        "comment_id": 14,
        "your_words": "was a popular destination",
        "recommend_upgrade_words": "proved to be a popular destination",
        "explanation": "'Proved to be' adds a slight degree of formality."
      },
      {
        "comment_id": 15,
        "your_words": "with a wide range in the number of students from each nation",
        "recommend_upgrade_words": "demonstrating a considerable variation in student numbers from each nation",
        "explanation": "This rephrasing uses more sophisticated vocabulary ('demonstrating', 'considerable variation')."
      }
    ],
    "overview_of_the_image": {
      "main_trends_features_identified": "The overview correctly identifies the countries with the highest (Country E) and lowest (Country C) numbers of international students. This effectively captures the main trends.",
      "accuracy_of_description": "The description is accurate and reflects the information presented in the bar chart description.",
      "clarity_and_conciseness": "The overview is clear and concise, providing the essential information without unnecessary detail.",
      "improved_overview": "Consider starting the overview with a more general statement about what the chart represents before highlighting the specific highest and lowest points. For example: 'The bar chart provides data on the number of international students from five countries studying in the UK in 2017. Overall, Country E had the highest number of students, while Country C had the fewest.'"
    },
    "main_points": [
      {
        "paragraph": 1,
        "feedback": {
          "data_selection_and_interpretation": "The paragraph accurately selects key data points for Countries A and B, representing the higher numbers of students.",
          "supporting_details": "The specific numbers provided (approximately 8,500 for Country A and around 6,000 for Country B) effectively support the main point.",
          "clarity_and_organization": "The information is presented clearly and logically, with a smooth transition between the two countries.",
          "suggestions_for_improvement": {
            "compare_and_contrast": "Consider using comparative language to highlight the difference between the numbers for Country A and Country B (e.g., 'while slightly lower than Country A')."
          }
        }
      },
      {
        "paragraph": 2,
        "feedback": {
          "data_selection_and_interpretation": "This paragraph appropriately focuses on the countries with lower student numbers, Country D and Country C.",
          "supporting_details": "The numbers provided for Country D (approximately 4,500) and Country C (about 3,000) are accurate.",
          "clarity_and_organization": "The contrast between the higher and lower numbers is clearly established.",
          "suggestions_for_improvement": {
            "linking_phrases": "Use a stronger linking phrase to connect this paragraph to the previous one, for example, 'In contrast to the higher figures for Countries A and B,...'"
          }
        }
      }
    ],
    "task_achievement": {
      "band_score": 7,
      "feedback": {
        "clearly_describe_key_features": {
          "detailed_explanation": "The essay clearly describes the key features of the bar chart, highlighting the countries with the highest and lowest numbers of students and providing data for the other countries.",
          "how_to_improve": "To achieve a higher band, ensure that all significant features are mentioned and that there is a clear overview statement summarizing the main trend."
        },
        "provide_sufficient_detail": {
          "detailed_explanation": "Sufficient detail is provided by including the approximate numbers of students for each country.",
          "how_to_improve": "Continue to provide specific data points to support your descriptions. Double-check the accuracy of these figures against the image description."
        },
        "select_and_report_main_features": {
          "detailed_explanation": "The essay effectively selects and reports the main features, focusing on the comparative numbers of students from each country.",
          "how_to_improve": "Ensure that the selection of main features is justified and that no significant trends or data points are overlooked."
        },
        "omit_unnecessary_information": {
          "detailed_explanation": "The essay appropriately omits unnecessary information and focuses on the key data presented in the chart.",
          "how_to_improve": "Continue to be concise and avoid speculation or drawing conclusions that are not directly supported by the data."
        }
      }
    },
    "coherence_cohesion": {
      "band_score": 7,
      "feedback": {
        "organize_information_logically": {
          "detailed_explanation": "The information is organized logically, starting with an overall statement and then providing details for each country.",
          "how_to_improve": "Consider using more varied linking phrases between sentences and paragraphs to enhance the flow of the essay."
        },
        "use_paragraphs_appropriately": {
          "detailed_explanation": "Paragraphs are used appropriately to group related information.",
          "how_to_improve": "Ensure each paragraph has a clear focus and that the transitions between paragraphs are smooth."
        },
        "use_cohesive_devices": {
          "detailed_explanation": "Cohesive devices like 'Overall', 'also', 'In contrast', and 'In conclusion' are used appropriately.",
          "how_to_improve": "Expand the range of cohesive devices used to create more sophisticated connections between ideas."
        }
      }
    },
    "lexical_resource": {
      "band_score": 6,
      "feedback": {
        "use_wide_range_vocabulary": {
          "detailed_explanation": "The vocabulary used is adequate for the task, but there is room for improvement in terms of range.",
          "how_to_improve": "Incorporate more synonyms and less common vocabulary related to describing data and trends (e.g., 'substantial', 'marginal', 'fluctuations')."
        },
        "use_vocabulary_precisely": {
          "detailed_explanation": "Vocabulary is generally used precisely, but some phrases could be more formal (e.g., 'had the most').",
          "how_to_improve": "Focus on using more formal and academic language appropriate for IELTS writing."
        },
        "use_correct_spelling": {
          "detailed_explanation": "Spelling is correct throughout the essay.",
          "how_to_improve": "Continue to proofread carefully to avoid any potential spelling errors."
        }
      }
    },
    "grammatical_range_accuracy": {
      "band_score": 7,
      "feedback": {
        "use_wide_range_structures": {
          "detailed_explanation": "A variety of sentence structures are used, including simple, compound, and complex sentences.",
          "how_to_improve": "Continue to vary sentence structure to make the writing more engaging and sophisticated."
        },
        "use_grammar_punctuation_accurately": {
          "detailed_explanation": "Grammar and punctuation are generally accurate, with only minor errors.",
          "how_to_improve": "Pay attention to subject-verb agreement, correct tense usage, and appropriate punctuation to minimize errors."
        }
      }
    }
  }
}
So this is a Question (including a description of the image) and my essay I need you to evaluate then response me a only JSON without adding any text :
`