interface TruncateWordsProps {
    /**
     * The full text to be truncated.
     * @example "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
     */
    text: string;
  
    /**
     * The maximum number of words to display before truncating the text.
     * @example 10
     */
    maxWords: number;
  }
  
  /**
   * TruncateWords component truncates a given text to a specified number of words.
   * If the text exceeds the maximum number of words, it appends '...' to indicate more content.
   *
   * @param {TruncateWordsProps} props - The properties object.
   * @param {string} props.text - The full text to be truncated.
   * @param {number} props.maxWords - The maximum number of words to display before truncating the text.
   * 
   * @returns {JSX.Element} - The JSX element containing the truncated text with '...' appended if the text is longer than maxWords.
   */
  export const TruncateWords: React.FC<TruncateWordsProps> = ({ text, maxWords }) => {
    const words = text.split(' ');
  
    // Determine if the text should be truncated
    const shouldTruncate = words.length > maxWords;
  
    // Create the truncated text
    const truncatedText = shouldTruncate ? words.slice(0, maxWords).join(' ') + '...' : text;
  
    return <>{truncatedText}</>;
  };