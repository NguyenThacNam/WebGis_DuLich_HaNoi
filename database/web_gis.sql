PGDMP  #    "    	            }            webgis_HaNoi    17.4    17.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    17473    webgis_HaNoi    DATABASE     t   CREATE DATABASE "webgis_HaNoi" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE "webgis_HaNoi";
                     postgres    false                        3079    17474    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                        false            �           0    0    EXTENSION postgis    COMMENT     ^   COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';
                             false    2            �            1259    18570    admin    TABLE     o   CREATE TABLE public.admin (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.admin;
       public         heap r       postgres    false            �            1259    18569    admin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.admin_id_seq;
       public               postgres    false    226            �           0    0    admin_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;
          public               postgres    false    225            �            1259    18561    places    TABLE       CREATE TABLE public.places (
    id integer NOT NULL,
    name text NOT NULL,
    category text,
    description text,
    latitude double precision,
    longitude double precision,
    geom public.geometry(Point,4326),
    image_url text,
    location text,
    opening_hours text
);
    DROP TABLE public.places;
       public         heap r       postgres    false    2    2    2    2    2    2    2    2            �            1259    18560    places_id_seq    SEQUENCE     �   CREATE SEQUENCE public.places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.places_id_seq;
       public               postgres    false    224            �           0    0    places_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.places_id_seq OWNED BY public.places.id;
          public               postgres    false    223                       2604    18573    admin id    DEFAULT     d   ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);
 7   ALTER TABLE public.admin ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225    226                       2604    18564 	   places id    DEFAULT     f   ALTER TABLE ONLY public.places ALTER COLUMN id SET DEFAULT nextval('public.places_id_seq'::regclass);
 8   ALTER TABLE public.places ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            �          0    18570    admin 
   TABLE DATA           7   COPY public.admin (id, username, password) FROM stdin;
    public               postgres    false    226   �       �          0    18561    places 
   TABLE DATA           �   COPY public.places (id, name, category, description, latitude, longitude, geom, image_url, location, opening_hours) FROM stdin;
    public               postgres    false    224                    0    17796    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public               postgres    false    219   �        �           0    0    admin_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.admin_id_seq', 1, true);
          public               postgres    false    225            �           0    0    places_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.places_id_seq', 21, true);
          public               postgres    false    223            #           2606    18577    admin admin_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_pkey;
       public                 postgres    false    226            %           2606    18579    admin admin_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.admin DROP CONSTRAINT admin_username_key;
       public                 postgres    false    226            !           2606    18568    places places_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.places DROP CONSTRAINT places_pkey;
       public                 postgres    false    224            �   Z   x�3�LL���3�442�2�p8U��TTʍ�,�͋��<*�-M#+}���3S=,��C#�}KJ�*�ʢ�
��C�3
K���b���� 7��      �   �	  x��XMo�F>+�bN{��p>�{ Eъ�eǲ���EZ%˔b���"(6����Xl�"�ݠ鶗J�����?�w�T-�J�6 Q�pH>�<��)'@��磊?y�(3�
�����t��Φ�7�d�'E���(���
�s���2l�j���Bs��;�=����_��p:~�y�1z����п˩F�����]��c�`)��uC`���13R��#Z����4Ø�̌̢�-�c����j)?��g�ݽ����F��h�ώz^'���h���v�Z.���]#�n=g:~����{�h��-W����w�~D5#��O7�a'5�n�6���
�5���D���E���\C�`:�"B�Z;e|�ii,��Oe��/5���KU&ߴQ+��v_��~�<5(��~l��J��K�P8(�˱��|u'����䴁��O� ���)&�B5��
|A�	ۄ^�&�cgMna�J���r�ͬNW�6�Z�>v��!����GC�mu���o����|��>�e��av�s��_����;o��A/�+���U� ��so� ��E���?������Jp`�*��XL���ߡ��&��Qֲ�nrCī[��Ԥ��% 3�j��a�&�dJ�0������ݳϳ魓����A�l���(���Li��ٵ��J�lqu��5��/�Hk�|�-x�Wk��P��6R�����e(��%`|�vI!��yR'���\R5*������[C�9n��P���I1��jdn�Ԅ�ဪ`��8� �%���`�h�S "�D�NM�bD�Ҋc�,�e٘ׄ�-[�{EN���n�x��������^o�������N�{e���n'��� '�!�&+��6��*�S�=���[@��2@� ��M���5������0�`��*���%��>��{w�=tگ)��_�㥪�\�r̙.0��:�鈂K�?�K8�cW��bά���;�h抜����O\;������l��i:�����p�\)�_u$�B5�e�%�?�";&pe⊤���U���I�B	�F0�l��{WoAT1	# (��S?^��3���b&i�՘�ϯ�tu�ܥ���2��7�@y[��ZL1�apA�dV�4��	j��&�ҳ�-�ie]̲6�HM�HS�׎��t����N��;�ȟ��;����9�l��?��f�$��hk�6���5�k�b�K$��>�0=��(���*B˩Z�S!�+�k*��$-��
�"YI����jד�p�M)1�
~?�{�w�b]1*tJ�F��¨�W���'_Z���t!})�65C�+몜i^�s�K7�9ﴸ�޷:C���E�o8���?a�C	��|��'i�#��L��ѷ�T�[�c!YAm~H\[Wo���-Wo�;M^c���m��7�jo5���@y�(�z�&��K�F�`ܠ&�ē��LaZ`���Қh����0���,W#�)�W�g=;m�:/2��tR=(��S�d����{�C�,r���gW��xDy)��'�
�4�����|�U �	%({@�U %�Q��Gi����-0q+&'�#3U�:ؑ`BcT_�*�#�t,K�
´���YYU[�s����3}��>8f�g�^T�*��A���݋s;h�V�,���� ".y���V�KS��`K��؂���AM��p��*1/Cc��u.x��d~0�k©���1L04۴���؄�u�aqEŤ�Jn������C��ҭ��Z��yx�c����]w1E��L���Q��R&?@L����qh�q��xt}Bj���T��M� {U�2�����Z�bf*-p��_��HYS5|�������� 3��L(�S2�t4FG��֯馌 ���((PD�H�2��y�&�&]��ضc`���oU��{Q���A���+�mW�
���o6/���yM��ŶTrdK��TT� ���	��2��@-�PN���I����@_v�������m���O��R��C��s�$J�1��BCO�!Ձ�P�eY�Ra�XP�Y�pA)���.�C��Że��*�͝����nfc�_�]���G�tz�pL�P
`���Z�I�TR�U����$�1:X���#����!�����Q%h��L}2-r���xr�ޞ��C��L~J^5��k�.|����*�_�bR��1M�d�v��1w�OȖ��e��.�6�|�5lC7����uW|�S���'�{�4���m����A笼{�>���>4N��C��)	�6�0�r� Z՗��j�
���a*q`�]KE�|��s#�'� n�����~�|������	�Z�k3I��M}^Z%:�{'{�n#8��۝�ݝa��ډ�U���}�\%a����mi�9��2�z@�`_?�<>_�s����S3Q            x������ � �     