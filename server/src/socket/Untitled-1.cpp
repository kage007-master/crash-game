enum {NONE, ADDR_CARDANO, ADDR_}

bool isHex(char chr){
    return (chr >= 'a' && chr <= 'f') || (chr >= 'A' && chr <= 'F');
}
enum {HD_NONE, HD_HEX, HD_COSMOS, HD_CRO, HD_CARDANO, HD_TERRA};
char heads[][10] = {"", "0x", "cosmos", "cro", "addr", "terra"};
int CheckHead(char * str) {
    char temp[10];
    for (int i = HD_HEX; i <= HD_TERRA; i ++) {
        strncpy_s(temp, 10, str, strlen(heads[i]));
        strlwr(temp);
        return strcmp(temp, heads[i]) == 0 ? i : HD_NONE;
    }
    return HD_NONE;
}

int CheckType(char * str){
	int hex = 0;
	int alpha = 0;
	int digit = 0, length = 0;
	for (; str[length]; length ++){
		digit += isdigit(str[length]);
		alpha += isalpha(str[length]);
		hex += isHex(str[length]);
	}
    if (length != digit + alpha) return NONE;
	switch(length){
        case 88:
            return PK_SOL;
        case 52:
            return PK_BITCOIN;
        case 64:
            return alpha == hex ? PK_EVM : NONE;
        case 66:
            return CheckHead(str) == HD_HEX && hex + digit == 65 ? PK_EVM : NONE;
        case 44:
            return CheckHead(str) == HD_TERRA ? ADDR_TERRA : ADDR_SOL;
        case 45:
            return CheckHead(str) == HD_COSMOS ? ADDR_COSMOS : NONE;
        case 42:
            return CheckHead(str) == HD_CRO ? ADDR_CRO : CheckHead(str) == HD_HEX ? ADDR_EVM : NONE;
        case 103:
            return CheckHead(str) == HD_CARDANO ? ADDR_CARDANO : NONE;
        case 34:
            return ADDR_TRON;
	}
}