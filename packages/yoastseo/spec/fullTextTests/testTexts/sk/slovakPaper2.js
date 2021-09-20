import Paper from "../../../../src/values/Paper.js";
import content from "./slovakPaper2.html";

const name = "slovakPaper2";

const paper = new Paper( content, {
	keyword: "Mačka domáca",
	synonyms: "Felis catus",
	description: "Mačka domáca (lat. Felis catus) je niekoľko storočí domestikovaný poddruh mačky divej. Po svojich predkoch" +
		" zdedila vynikajúci zrak, sluch a k lovu dokonale prispôsobené telo.",
	title: "Mačka domáca",
	titleWidth: 450,
	locale: "sk_SK",
	permalink: "https://sk.wikipedia.org/wiki/Ma%C4%8Dka_dom%C3%A1ca",
	url: "Ma%C4%8Dka_dom%C3%A1ca",
} );

const expectedResults = {
	introductionKeyword: {
		isApplicable: true,
		score: 9,
		resultText: "Keyphrase in introduction</a>: Well done!",
	},
	keyphraseLength: {
		isApplicable: true,
		score: 9,
		resultText: "Keyphrase length</a>: Good job!",
	},
	keywordDensity: {
		isApplicable: true,
		score: 4,
		resultText: "Keyphrase density</a>: The focus keyphrase was found 13 times. " +
			"That's less than the recommended minimum of 21 times for a text of this length. " +
			"Focus on your keyphrase</a>!",
	},
	metaDescriptionKeyword: {
		isApplicable: true,
		score: 9,
		resultText: "Keyphrase in meta description</a>: Keyphrase or synonym appear " +
			"in the meta description. Well done!",
	},
	metaDescriptionLength: {
		isApplicable: true,
		score: 6,
		resultText: "Meta description length</a>: The meta description is over 156 " +
			"characters. To ensure the entire description will be visible, " +
			"you should reduce the length</a>!",
	},
	subheadingsKeyword: {
		isApplicable: true,
		score: 3,
		resultText: "Keyphrase in subheading</a>: <a href='https://yoa.st/33n' " +
			"target='_blank'>Use more keyphrases or synonyms in your H2 and H3 subheadings</a>!",
	},
	textCompetingLinks: {
		isApplicable: true,
		score: 2,
		resultText: "Link keyphrase</a>: You're linking to another page with " +
			"the words you want this page to rank for. Don't do that</a>!",
	},
	textLength: {
		isApplicable: true,
		score: 9,
		resultText: "Text length</a>: The text contains 5721 words. Good job!",
	},
	externalLinks: {
		isApplicable: true,
		score: 8,
		resultText: "Outbound links</a>: There are both nofollowed and normal " +
			"outbound links on this page. Good job!",
	},
	internalLinks: {
		isApplicable: true,
		score: 8,
		resultText: "Internal links</a>: There are both nofollowed and normal " +
			"internal links on this page. Good job!",
	},
	titleKeyword: {
		isApplicable: true,
		score: 9,
		resultText: "Keyphrase in title</a>: The exact match of the focus keyphrase " +
			"appears at the beginning of the SEO title. Good job!",
	},
	titleWidth: {
		isApplicable: true,
		score: 9,
		resultText: "SEO title width</a>: Good job!",
	},
	urlKeyword: {
		isApplicable: true,
		score: 6,
		resultText: "Keyphrase in slug</a>: (Part of) your keyphrase does not appear " +
			"in the slug. Change that</a>!",
	},
	urlLength: {
		isApplicable: true,
		score: 0,
		resultText: "",
	},
	urlStopWords: {
		isApplicable: false,
	},
	keyphraseDistribution: {
		isApplicable: true,
		score: 1,
		resultText: "Keyphrase distribution</a>: Very uneven. Large parts of your " +
			"text do not contain the keyphrase or its synonyms. Distribute them more evenly</a>.",
	},
	fleschReadingEase: {
		isApplicable: false,
	},
	subheadingsTooLong: {
		isApplicable: true,
		score: 3,
		resultText: "Subheading distribution</a>: 4 sections of your text are longer" +
			" than 300 words and are not separated by any subheadings. Add subheadings" +
			" to improve readability</a>.",
	},
	textParagraphTooLong: {
		isApplicable: true,
		score: 6,
		resultText: "Paragraph length</a>: 3 of the paragraphs contain more than " +
			"the recommended maximum of 150 words. Shorten your paragraphs</a>!",
	},
	textSentenceLength: {
		isApplicable: true,
		score: 9,
		resultText: "Sentence length</a>: Great!",
	},
	textTransitionWords: {
		isApplicable: true,
		score: 3,
		resultText: "Transition words</a>: Only 11.9% of the sentences contain" +
			" transition words, which is not enough. Use more of them</a>.",
	},
	passiveVoice: {
		isApplicable: true,
		score: 9,
		resultText: "Passive voice</a>: You're using enough active voice. That's great!",
	},
	textPresence: {
		isApplicable: true,
		score: 0,
		resultText: "",
	},
	sentenceBeginnings: {
		isApplicable: true,
		score: 3,
		resultText: "Consecutive sentences</a>: The text contains 3 instances where 3 or " +
			"more consecutive sentences start with the same word. Try to mix things up</a>!",
	},
	imageKeyphrase: {
		isApplicable: true,
		score: 6,
		resultText: "Image Keyphrase</a>: Images on this page do not have alt attributes with at least" +
			" half of the words from your keyphrase. Fix that</a>!",
	},
	imageCount: {
		isApplicable: true,
		score: 9,
		resultText: "Images</a>: Good job!",
	},
};

export {
	name,
	paper,
	expectedResults,
};

export default {
	name: name,
	paper: paper,
	expectedResults: expectedResults,
};

