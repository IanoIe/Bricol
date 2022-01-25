use bricol;

insert into Utilizador(idUtilizador, Nome, Username, Email, Password) values (1, "Luis Mendes", "Mendes", "mendes@gmail.com", "mendes");
insert into Utilizador(idUtilizador, Nome, Username, Email, Password) values (2, "Maria Gomes", "Maria", "maria@hotmail.com", "maria");
insert into Utilizador(idUtilizador, Nome, Username, Email, Password) values (3, "Ana Mateus", "Ana", "ana@hotmail.com", "ana");
insert into Utilizador(idUtilizador, Nome, Username, Email, Password) values (4, "João Gil", "Gil", "gil@hotmail.com", "gil");
insert into Utilizador(idUtilizador, Nome, Username, Email, Password) values (5, "Carlos Lopes", "Carlos", "carlos@gmail.com", "carlos");
insert into Utilizador(idUtilizador, Nome, Username, Email, Password) values (6, "Domingos Simões", "Simões", "domingos@gmail.com", "simoes");
insert into Utilizador(idUtilizador, Nome, Username, Email, Password) values (7, "Fabio Costa", "Fabio", "fabio@gmail.com", "fabio");


insert into Localizacao(idLocalizacao, Longitude, Latitude) values (1, "-8.854980468750002", "38.831149809348744");
insert into Localizacao(idLocalizacao, Longitude, Latitude) values (2, "-9.140625000000002", "38.69408504756833");
insert into Localizacao(idLocalizacao, Longitude, Latitude) values (3, "-9.129638671875002","38.59970036588819");
insert into Localizacao(idLocalizacao, Longitude, Latitude) values (4, "-8.964843750000002","38.676933444637925");
insert into Localizacao(idLocalizacao, Longitude, Latitude) values (5,"-9.184570312500002","38.60828592850559");
insert into Localizacao(idLocalizacao, Longitude, Latitude) values (6,"-9.999999999999990","38.70823492850559");
insert into Localizacao(idLocalizacao, Longitude, Latitude) values (7,"-9.780540312500002","38.60820332850559");


insert into Anuncio(idAnuncio, Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values (1, "Cafe-Bar", "Limpar bem o bar", "2021-02-02", 1, 1);
insert into Anuncio(idAnuncio, Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values (2, "Salão", "Limpar bem salão de casamento", "2021-03-03", 2, 2);
insert into Anuncio(idAnuncio, Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values (3, "Quintão", "Depois do Natal, precisava de uma pessoa que limpa este salão de festas", "2021-12-26", 3, 3);
insert into Anuncio(idAnuncio, Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values (4, "Quinhentos Pessoas", "Precisa-se de tres pessoas para recolher lixo neste espaço durante um dia", "2021-08-09", 4, 4);
insert into Anuncio(idAnuncio, Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values (5, " Bancada VIP", "Precisa-se de 5 pessoas para limpar esta bancada da zona VIP (200m^2)", "2021-10-13", 5, 5);
insert into Anuncio(idAnuncio, Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values (6, "Cafe", "Limpa bem como se fosse na tua casa", "2021-02-20", 3, 1);
insert into Anuncio(idAnuncio, Titulo, Descricao, DatAnuncio, Localizacao_idLocalizacao, Utilizador_idUtilizador) values (7, "Cafe da Joana", "Precisa de desinfetar WC deste café", "2021-02-04", 4, 1);


insert into Imagens(idImagens, Url, DatImagem, Anuncio_idAnuncio) values (1, "https://cdn.intent24.fr/out/pictures/generated/product/1/640_480_75/3-90104-90104-1.jpg", "2021-02-03", 1);
insert into Imagens(idImagens, Url, DatImagem, Anuncio_idAnuncio) values (2, "https://i.pinimg.com/originals/56/bb/d4/56bbd42733b01c6492d956c213f66b14.jpg", "2021-10-29", 2);
insert into Imagens(idImagens, Url, DatImagem, Anuncio_idAnuncio) values (3, "https://www.quintadocorvo.pt/fileuploads/Galeria/Homepage/_EXTERIOR12.jpg", "2021-12-27", 3);
insert into Imagens(idImagens, Url, DatImagem, Anuncio_idAnuncio) values (4, "https://www.redeatividade.com/web/wp-content/uploads/2019/08/WhatsApp-Image-2019-08-22-at-15.13.32.jpeg", "2021-09-20", 4);
insert into Imagens(idImagens, Url, DatImagem, Anuncio_idAnuncio) values (5, "https://www.cdnacional.pt/wp-content/uploads/2015/10/Bancada-vip1.jpg", "2021-02-03", 5);
insert into Imagens(idImagens, Url, DatImagem, Anuncio_idAnuncio) values (6, "https://www.nit.pt/wp-content/uploads/2019/03/bbeecaeb4dc6a6ff300846002566d419-1-754x394.jpg", "2021-02-03", 6);
insert into Imagens(idImagens, Url, DatImagem, Anuncio_idAnuncio) values (7, "https://i1.wp.com/vozdabarra.com/wp-content/uploads/2021/09/1632324475_Criancas-sao-restadas-em-situacao-de-maus-tratos-em-casa-suja.jpeg?fit=800%2C600&ssl=1", "2021-06-30", 7);


insert into Mensagens(idMensagens, Mensagem,  dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (1, "Pretendo fazer este serviço que você publicou", "2021-03-02", 2, 1);
insert into Mensagens(idMensagens, Mensagem,  dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (2, "Quanto custa este serviço? Sou profisiional na area", "2021-06-06", 1, 2);
insert into Mensagens(idMensagens, Mensagem,  dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (3, "Quanto custa? Sou profisiional na area", "2021-06-06", 4, 3);
insert into Mensagens(idMensagens, Mensagem, dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (4, "Somos cinco pessoas e gostariamos de ter mais inforção sobre limpeza deste local", "2021-07-08", 5, 4);
insert into Mensagens(idMensagens, Mensagem, dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (5, "Boa tare, diz-me quando podemos ir começar limpar o local vip", "2021-09-20", 3, 5); 
insert into Mensagens(idMensagens, Mensagem,  dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (6, "Pretendo fazer este serviço mas fica-me muito longe", "2021-03-02", 4, 1);
insert into Mensagens(idMensagens, Mensagem,  dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (7, "Trabalhe para me se faz favor", "2021-09-02", 4, 6);