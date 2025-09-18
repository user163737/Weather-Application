import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchCities, GeocodingResult } from '../services/weatherApi';

interface SearchBarProps {
  onSearch: (location: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        try {
          const results = await searchCities(query);
          setSuggestions(results);
          setShowSuggestions(true);
          setSelectedIndex(-1);
        } catch (error) {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      const selected = suggestions[selectedIndex];
      onSearch(`${selected.name}, ${selected.country}`);
      setQuery(`${selected.name}, ${selected.country}`);
      setShowSuggestions(false);
    } else if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: GeocodingResult) => {
    const locationString = `${suggestion.name}, ${suggestion.country}`;
    setQuery(locationString);
    onSearch(locationString);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };
  return (
    <div ref={searchRef} className="w-full max-w-md mx-auto mb-8 relative">
      <form onSubmit={handleSubmit}>
      <div className="glass-card relative rounded-2xl overflow-hidden">
        <div className="flex items-center p-4">
          <MapPin className="w-5 h-5 text-white/70 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-lg"
              autoComplete="off"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="ml-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      </form>
      
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl overflow-hidden z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.name}-${suggestion.country}-${suggestion.latitude}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left p-4 flex items-center space-x-3 hover:bg-white/10 transition-colors ${
                index === selectedIndex ? 'bg-white/10' : ''
              }`}
            >
              <MapPin className="w-4 h-4 text-white/70 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{suggestion.name}</p>
                <p className="text-white/60 text-sm truncate">{suggestion.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;