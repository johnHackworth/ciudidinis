const isNameValidChar = function( c ) {
  return c.toLowerCase() != c.toUpperCase() || c === '_' || Number.isInteger( c );
}

const mimimify = function( text ) {
	let output = "";
	let inName = false;
	for ( let i = 0; i < text.length; i++ ) {
		const prev = text[ i - 1 ];
		const next = text[ i + 1 ];
		const char = text[ i ];	

		if ( inName && ! isNameValidChar( char ) ) {
			inName = false;
		}
		if( ! inName && char === '@' && next && isNameValidChar( next ) ) {
			inName = true;
		}

		if ( !inName ) {
			if( 'aeou'.indexOf( char ) >= 0 &&
				next && 'aeouiAEIOUáéíóúÁÉÍÓÚ'.indexOf( next ) == -1 &&
				prev && 'iIíÍ'.indexOf( prev ) == -1 ) {
				output += 'i';
			} else if( 'áéíóú'.indexOf( char ) >= 0 &&
				next && 'aeouiAEIOUáéíóúÁÉÍÓÚ'.indexOf( next ) == -1 &&
				prev && 'iIíÍ'.indexOf( prev ) == -1 ) {
				output += 'í';
			} else if( 'AEIOU'.indexOf( char ) >= 0 &&
				next && 'aeouiAEIOUáéíóúÁÉÍÓÚ'.indexOf( next ) == -1 &&
				prev && 'iIíÍ'.indexOf( prev ) == -1 ) {
				output += 'I';
			} else if( 'ÁÉÍÓÚ'.indexOf( char ) >= 0 &&
				next && 'aeouiAEIOUáéíóúÁÉÍÓÚ'.indexOf( next ) == -1 &&
				prev && 'iIíÍ'.indexOf( prev ) == -1 ) {
				output += 'Í';
			} else {
				output += char;
			}
		} else {
			output += char;			
		}
	}
	console.log(output);
	return output;
};

module.exports = mimimify;