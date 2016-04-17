var Node = function(value, ends){
  return {
    v : value,
    e : ends,
    childs : {
    }
  };
};

var Trie = function(){
  this.cnt = 0;
  this.rootObj = {
    childs : {
    }
  };
};

Trie.prototype.add = function(str){
  var cur = this.rootObj;
  for(var i = 0; i < str.length; ++i){
    var c = str[i];
    if(cur.childs.hasOwnProperty(c)){
      cur = cur.childs[c];
    }else{
      cur = cur.childs[c] = new Node(c, (i == str.length - 1));
    }
  }
  this.cnt++;
  return true;
};

Trie.prototype.find = function(str){
  var cur = this.rootObj;
  var exists = true;
  for(var i = 0; i < str.length && exists; ++i){
    var c = str[i];
    if(!cur.childs.hasOwnProperty(c)){
      exists = false;
    }
    cur = cur.childs[c];
  }
  if(!exists) cur = null;
  return cur;
};


Trie.prototype.explore = function(cur, str, arr){
  var keys = Object.keys(cur.childs);
  for(var i = 0; i < keys.length; ++i){
    var k = keys[i];
    var next = cur.childs[k];
    var nstr = str + k;
    if(next.e) arr.push(nstr);
    arr.concat(this.explore(next, nstr, arr));
  }
  return arr;
};

Trie.prototype.suggestions = function(str){
  var cur = this.find(str);
  if(!cur) return [];
  return this.explore(cur, str, []);
};

Trie.prototype.count = function(){
  return this.cnt;
};

module.exports = {
  /* nvtaveras implemented this Trie Tree Implementation & this implementation is from his github */
  Trie: Trie
};
